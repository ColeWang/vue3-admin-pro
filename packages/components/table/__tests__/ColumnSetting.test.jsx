import { describe } from 'vitest'
import ColumnSetting from '../compatible/setting'
import TreeList from '../compatible/setting/TreeList'
import TreeNode from '../compatible/setting/TreeNode'
import Tooltip from '../compatible/setting/Tooltip'
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
