import { describe } from 'vitest'
import ColumnSetting from '../components/setting'
import TreeList from '../components/setting/TreeList'
import TreeNode from '../components/setting/TreeNode'
import Tooltip from '../components/setting/Tooltip'
import mountTest from '../../../tests/shared/mountTest'

describe('ColumnSetting', () => {
    mountTest(ColumnSetting)
    mountTest(TreeList)
    mountTest(TreeNode)
    mountTest(Tooltip)

    mountTest(() => {
        const columns = [
            {
                title: 'demo 1',
                dataIndex: 'demo1'
            }
        ]
        return (
            <TreeList columns={columns} title={'Title'} fixed={'left'}/>
        )
    })
})
