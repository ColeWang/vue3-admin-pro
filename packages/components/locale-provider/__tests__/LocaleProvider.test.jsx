import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import mountTest from '@site-pro/tests/shared/mountTest'
import { defineComponent } from 'vue'
import { LocaleProvider, useLocaleReceiver } from '../index'
import enUS from '@site-pro/locale/en-US'

describe('LocaleProvider', () => {
    mountTest(LocaleProvider)

    it(`test locale change`, async () => {
        const Demo = defineComponent({
            setup () {
                const { t } = useLocaleReceiver(['Table', 'toolbar'])
                return () => {
                    return <div>{t('reload')}</div>
                }
            }
        })

        const wrapper = mount(LocaleProvider, {
            slots: { default: () => <Demo/> }
        })
        expect(wrapper.text()).toBe('刷新')
        await wrapper.setProps({ locale: enUS })
        expect(wrapper.text()).toBe('Refresh')
    })
})
