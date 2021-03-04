import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.layoutElHeader,
  tag: 'el-header',
  description: {
    name: '顶栏容器',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    height: {
      type: '0',
      name: '',
      value: '60px',
      title: '顶栏高度',
      required: false
    }
  },
  list: []
}
