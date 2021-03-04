import widgetTypes from '@/components/factory/widgetTypes'

export default {
  type: widgetTypes.basicElInputNumber,
  tag: 'el-input-number',
  description: {
    name: '计数器',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    value: {
      type: '1',
      name: '',
      value: 0,
      title: '值',
      optionType: 'number'
    },
    min: {
      type: '0',
      value: 0,
      optionType: 'number',
      required: false,
      title: '最小值'
    },
    max: {
      type: '0',
      value: 10,
      optionType: 'number',
      required: false,
      title: '最大值'
    },
    step: {
      title: '步长',
      type: '0',
      value: 1,
      optionType: 'number',
      required: false
    },
    'step-strictly': {
      title: '只能输入步数倍数',
      type: '0',
      value: 0,
      optionType: 'number',
      required: false
    },
    precision: {
      title: '精度',
      type: '0',
      value: 0,
      optionType: 'number',
      required: false
    },
    size: {
      title: '尺寸',
      type: '0',
      value: '',
      required: false,
      optionType: 'select'
    },
    disabled: {
      type: '0',
      value: true,
      required: false,
      optionType: 'checkbox',
      title: '禁用'
    },
    controls: {
      type: '0',
      value: true,
      required: false,
      optionType: 'checkbox',
      title: '使用控制按钮'
    }
  },
  list: []
}
