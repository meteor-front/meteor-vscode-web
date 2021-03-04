import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicBlock,
  tag: 'BasicBlock',
  description: {
    name: '内容块',
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
