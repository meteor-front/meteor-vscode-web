import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicElButton,
  tag: 'el-button',
  description: {
    name: '按钮',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    type: {
      type: '0',
      name: '',
      value: 'primary',
      title: '类型',
      required: true,
      optionType: 'select'
    },
    size: {
      type: '0',
      name: '',
      value: '',
      title: '尺寸',
      required: false,
      optionType: 'select'
    },
    round: {
      type: '0',
      name: '',
      value: false,
      title: '圆角',
      required: false,
      optionType: 'checkbox'
    },
    circle: {
      type: '0',
      name: '',
      value: false,
      title: '圆形',
      required: false,
      optionType: 'checkbox'
    },
    plain: {
      type: '0',
      name: '',
      value: false,
      title: '朴素',
      required: false,
      optionType: 'checkbox'
    },
    loading: {
      type: '0',
      name: '',
      value: false,
      title: '加载中状态',
      required: false,
      optionType: 'checkbox'
    },
    disabled: {
      type: '0',
      name: '',
      value: false,
      title: '禁用',
      required: false,
      optionType: 'checkbox'
    },
    icon: {
      type: '0',
      name: '',
      value: '',
      title: '图标',
      required: false,
      optionType: 'select'
    }
  },
  list: []
}
