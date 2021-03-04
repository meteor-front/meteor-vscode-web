import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.layoutElFooter,
  tag: 'el-footer',
  description: {
    name: '底栏容器',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    height: {
      type: '0',
      name: '',
      value: '60px',
      title: '底栏高度',
      required: false
    }
  },
  list: []
}
