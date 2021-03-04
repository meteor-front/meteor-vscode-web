import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicIcon,
  tag: 'BasicIcon',
  description: {
    name: '图标',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    icon: {
      type: '0',
      title: '图标名',
      value: '',
      optionType: 'select',
      required: true
    }
  },
  list: []
}
