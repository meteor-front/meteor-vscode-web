import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.layoutElRow,
  tag: 'el-row',
  description: {
    name: '栅格行',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    tag: {
      type: '0',
      name: '',
      value: '',
      title: '元素标签',
      required: false
    },
    gutter: {
      type: '0',
      name: '',
      value: 0,
      title: '栅格间隔',
      form: 'number',
      required: true
    },
    type: {
      type: '0',
      name: '',
      value: '',
      title: '布局模式',
      required: false,
      optionType: 'select'
    },
    justify: {
      type: '0',
      name: '',
      value: '',
      title: '水平排列方式',
      required: false,
      optionType: 'select'
    },
    align: {
      type: '0',
      name: '',
      value: '',
      title: '垂直排列方式',
      required: false,
      optionType: 'select'
    }
  },
  list: []
}
