import { Descriptions } from 'ant-design-vue'

/**
 * Descriptions.Item 源码直接执行了 slots.default() 导致 render 并不会执行。
 * 没办法和 Field 结合起来, 只能单独用
 */
const Item = Descriptions.Item

export default Item
