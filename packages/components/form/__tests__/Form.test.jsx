import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { BaseForm, DrawerForm, Form, HocField, ModalForm, QueryFilter, Submitter } from '../index'
import mountTest from '../../../tests/shared/mountTest'
import MockResizeObserver from '../../../tests/__mocks__/resize-observer'
import { last } from 'lodash-es'

describe('Form', () => {
    beforeEach(() => {
        window.ResizeObserver = MockResizeObserver
    })

    const FieldDemo = HocField('text')

    mountTest(Form)
    mountTest(Form.Item)
    mountTest(Form.Group)
    mountTest(Form.List)
    mountTest(Form.Dependency)
    mountTest(QueryFilter)
    mountTest(ModalForm)
    mountTest(DrawerForm)

    it(`test Form`, async () => {
        const wrapper = mount(Form)
        const formInstance = wrapper.vm.getFormInstance()
        expect(formInstance).toBeTruthy()
    })

    it(`test Form Group`, async () => {
        const wrapper = mount(Form, {
            slots: {
                default: () => {
                    return [
                        <Form.Group title={'Title'}>
                            <FieldDemo name={'demo'}/>
                        </Form.Group>
                    ]
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        await wrapper.setProps({ layout: 'inline' })
        expect(wrapper.exists()).toBeTruthy()
    })

    it(`test Form Dependency`, async () => {
        const renderChildren = vi.fn()
        const nilNameChildren = vi.fn()
        const wrapper = mount(Form, {
            slots: {
                default: () => {
                    return [
                        <FieldDemo name={'demo'}/>,
                        <Form.Dependency name={['demo']} v-slots={{
                            default: renderChildren
                        }}/>,
                        <Form.Dependency name={[null]} v-slots={{
                            default: nilNameChildren
                        }}/>
                    ]
                }
            }
        })
        await wrapper.find('input').setValue('new value')
        expect(renderChildren).toHaveBeenCalledWith({ demo: 'new value' })
        expect(nilNameChildren).toHaveBeenCalledWith({})
    })

    it(`test Form QueryFilter`, async () => {
        const valuesChange = vi.fn()
        const wrapper = mount(QueryFilter, {
            props: { showCollapse: true, onValuesChange: valuesChange },
            slots: {
                default: (slotScope) => {
                    return [
                        <FieldDemo name={'demo'} {...slotScope.props}/>
                    ]
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        const formInstance = wrapper.vm.getFormInstance()
        expect(formInstance).toBeTruthy()
        // ---
        const buttonAll = wrapper.findAll('button')
        await Promise.all(buttonAll.map((button) => button.trigger('click')))
        expect(wrapper.emitted()).toHaveProperty('collapse')
        // form
        await new Promise((resolve) => setTimeout(resolve, 100))
        const baseForm = wrapper.findComponent(BaseForm)
        const changeEvents = baseForm.emitted('valuesChange')
        const resetEvents = baseForm.emitted('reset')
        const finishEvents = baseForm.emitted('finish')
        expect(last(resetEvents)).toEqual([{ demo: undefined }])
        expect(last(finishEvents)).toEqual([{ demo: undefined }])
        // input
        await wrapper.find('input').setValue('new value')
        expect(valuesChange).toHaveBeenCalledWith({ demo: 'new value' })
        expect(last(changeEvents)).toEqual([{ demo: 'new value' }])
    })

    function testFloatForm (Component, name) {
        it(`test Form ${name}`, async () => {
            const finish = vi.fn(() => Promise.resolve({}))
            const open = vi.fn()
            const cancel = vi.fn()
            const wrapper = mount(Component, {
                props: {
                    onFinish: finish,
                    extraProps: { onOpen: open, onCancel: cancel }
                },
                slots: {
                    default: () => {
                        return [
                            <FieldDemo name={'demo'}/>
                        ]
                    },
                    trigger: () => <button class={'open-button'}>打开</button>
                }
            })
            // open
            await wrapper.find('.open-button').trigger('click')
            expect(open).toHaveBeenCalled()
            expect(wrapper.emitted()).toHaveProperty('open')
            // 首先需要打开弹框 才能获取到 form
            const formInstance = wrapper.vm.getFormInstance()
            expect(formInstance).toBeTruthy()

            const submitter = wrapper.findComponent(Submitter)
            const buttonAll = submitter.findAll('button')
            // 提交
            const baseForm = wrapper.findComponent(BaseForm)
            const changeEvents = baseForm.emitted('valuesChange')
            await baseForm.find('input').setValue('new value')
            expect(last(changeEvents)).toEqual([{ demo: 'new value' }])
            await buttonAll[1].trigger('click')
            await new Promise((resolve) => setTimeout(resolve, 100))
            expect(baseForm.emitted()).toHaveProperty('finish')
            expect(finish).toHaveBeenCalled()
            expect(cancel).toHaveBeenCalled()
            expect(wrapper.emitted()).toHaveProperty('cancel')
            // -----------------------------
            expect(async () => {
                wrapper.setProps({ onFinish: () => Promise.reject(false) })
                wrapper.vm.open()
                await new Promise((resolve) => setTimeout(resolve, 100))
                const nextSubmitter = wrapper.findComponent(Submitter)
                const nextButtonAll = nextSubmitter.findAll('button')
                await nextButtonAll[1].trigger('click')
            }).not.toThrow()
        })
    }

    testFloatForm(ModalForm, 'ModalForm')
    testFloatForm(DrawerForm, 'DrawerForm')
})
