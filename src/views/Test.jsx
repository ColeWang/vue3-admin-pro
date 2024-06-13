import { defineComponent, ref, unref } from 'vue'
import {
    Form,
    Date,
    DateRange,
    DateWeek,
    DateWeekRange,
    DateMonth,
    DateMonthRange,
    DateQuarter,
    DateQuarterRange,
    DateYear,
    DateYearRange,
    DateTime,
    DateTimeRange,
    Time,
    TimeRange,
    Radio
} from '@/packages/form'

export default defineComponent({
    name: 'TestIndex',
    setup () {
        const open = ref(true)

        function onClick () {
            open.value = !unref(open)
        }

        return () => {
            return (
                <Form layout={'inline'}>
                    <Date width={'md'}/>
                    <DateRange width={'md'}/>
                    <DateWeek width={'md'}/>
                    <DateWeekRange width={'md'}/>
                    <DateMonth width={'md'}/>
                    <DateMonthRange width={'md'}/>
                    <DateQuarter width={'md'}/>
                    <DateQuarterRange width={'md'}/>
                    <DateYear width={'md'}/>
                    <DateYearRange width={'md'}/>
                    <DateTime width={'md'}/>
                    <DateTimeRange width={'md'}/>
                    <Time width={'md'}/>
                    <TimeRange width={'md'}/>
                </Form>
            )
        }
    }
})
