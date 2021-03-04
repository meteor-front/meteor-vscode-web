import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.layoutElRow,
  tag: 'el-col',
  description: {
    name: '栅格列',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    tag: {
      title: '元素标签',
      type: '0',
      required: false,
      value: 'div'
    },
    span: {
      title: '占据列数',
      type: '0',
      optionType: 'number',
      required: true,
      value: 12
    },
    offset: {
      title: '左侧间隔格数',
      type: '0',
      optionType: 'number',
      required: false,
      value: 0
    },
    push: {
      title: '向右移动格数',
      type: '0',
      optionType: 'number',
      required: false,
      value: 0
    },
    pull: {
      title: '向左移动格数',
      type: '0',
      optionType: 'number',
      required: false,
      value: 0
    }
  },
  list: []
}
