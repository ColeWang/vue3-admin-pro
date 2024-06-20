import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LocaleProvider, { useLocaleReceiver } from '../index'
import enUS from '../lang/en-US'

describe('LocaleProvider', () => {
    it(`render`, async () => {
        const wrapper = mount(LocaleProvider, {
            slots: {
                default: () => {
                    const { t } = useLocaleReceiver()
                    return (<div>{t('open')}</div>)
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        // 切换语言
        await wrapper.setProps({ locale: enUS })
        expect(wrapper.exists()).toBeTruthy()
    })

    it(`translate path`, () => {
        const wrapper = mount(LocaleProvider, {
            slots: {
                default: () => {
                    const { t } = useLocaleReceiver('Table')
                    return (<div>{t(['toolbar', 'reload'])}</div>)
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
