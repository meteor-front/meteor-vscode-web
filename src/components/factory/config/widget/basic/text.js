import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicText,
  tag: 'BasicText',
  description: {
    name: '文本',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    text: {
      type: '0',
      value: '',
      required: true,
      title: '内容'
    }
  },
  list: []
}
