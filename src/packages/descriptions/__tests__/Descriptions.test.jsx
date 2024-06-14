import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Descriptions from '../index'
import { Tooltip } from 'ant-design-vue'

describe('Descriptions', () => {
    it('render', async () => {
        const wrapper = mount(Descriptions)
        expect(wrapper.exists()).toBeTruthy()
    })

    it('props', async () => {
        const wrapper = mount(Descriptions, {
            props: {
                title: 'Test',
                params: { test: '123' },
                request: (params) => {
                    return Promise.resolve({ data: {} })
                },
                onLoad: (value) => {
                    console.log(value)
                }
            },
            slots: {
                default: () => {
                    return [
                        <Descriptions.Item label={'label'}/>,
                        <Descriptions.Item label={'label'}>
                            123
                        </Descriptions.Item>,
                        <Descriptions.Item valueType={'text'} label={'label'}/>
                    ]
                },
                extra: () => {
                    return (<Tooltip>123</Tooltip>)
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        // onReload
        wrapper.vm.reload && wrapper.vm.reload()
        // tryOnScopeDispose
        wrapper.unmount()
    })

    it('props columns', async () => {
        const wrapper = mount(Descriptions, {
            props: {
                title: () => 'Test',
                params: { test: '123' },
                columns: [
                    {
                        title: () => 'label',
                        valueType: 'text',
                        dataIndex: 'text',
                        index: '1'
                    }
                ],
                request: (params) => {
                    return Promise.reject('error')
                },
                onLoad: (value) => {
                    console.log(value)
                },
                onRequestError: (error) => {
                    console.log(error)
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
