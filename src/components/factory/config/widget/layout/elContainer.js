import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.layoutContainer,
  tag: 'el-container',
  description: {
    name: '外层容器',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    direction: {
      type: '0',
      name: '',
      value: '',
      title: '排列方向',
      optionType: 'select'
    }
  },
  list: []
}
