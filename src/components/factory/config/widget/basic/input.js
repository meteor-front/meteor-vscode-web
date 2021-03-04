import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicInput,
  tag: 'el-input',
  description: {
    name: '输入框',
    thumbnail: 'regular/keyboard'
  },
  slot: {
    prefix: {
      type: '0',
      title: '头部内容',
      value: false,
      required: false,
      optionType: 'checkbox',
      list: []
    },
    suffix: {
      type: '0',
      title: '尾部内容',
      value: false,
      required: false,
      optionType: 'checkbox',
      list: []
    },
    prepend: {
      type: '0',
      title: '前置内容',
      value: false,
      required: false,
      optionType: 'checkbox',
      list: []
    },
    append: {
      type: '0',
      title: '后置内容',
      value: false,
      required: false,
      optionType: 'checkbox',
      list: []
    }
  },
  className: '',
  attribute: {
    value: {
      type: '1',
      name: '',
      value: '1222',
      default: '122',
      title: '值'
    },
    placeholder: {
      type: '0',
      name: '',
      value: '请输入',
      title: '占位值'
    },
    type: {
      type: '0',
      name: '',
      value: 'text',
      title: '类型',
      optionType: 'select'
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
    readonly: {
      title: '只读',
      type: '0',
      value: false,
      required: false,
      optionType: 'checkbox'
    },
    maxlength: {
      type: '0',
      value: '8',
      title: '最大长度',
      required: false
    },
    minlength: {
      type: '0',
      value: '1',
      title: '最小长度',
      required: false
    },
    'show-word-limit': {
      type: '0',
      value: false,
      required: false,
      optionType: 'checkbox',
      title: '字数统计'
    },
    clearable: {
      type: '0',
      value: false,
      required: false,
      optionType: 'checkbox',
      title: '可清空'
    },
    'prefix-icon': {
      title: '头部图标',
      type: '0',
      value: '',
      required: false
    },
    'suffix-icon': {
      title: '尾部图标',
      type: '0',
      value: '',
      required: false
    },
    rows: {
      title: '输入框行数',
      type: '0',
      value: '',
      required: false
    },
    autosize: {
      title: '自适应内容高度',
      type: 'title',
      value: false,
      required: false,
      optionType: 'checkbox'
    },
    autocomplete: {
      title: '自动补全',
      type: '0',
      value: 'off',
      required: false,
      optionType: 'select'
    },
    max: {
      title: '最大值',
      type: '0',
      value: '',
      required: false
    },
    min: {
      title: '最小值',
      type: '0',
      value: '',
      required: false
    },
    autofocus: {
      title: '自动聚焦',
      type: '0',
      value: false,
      required: false,
      optionType: 'checkbox'
    }
  }
}
