import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicElLink,
  tag: 'el-link',
  description: {
    name: '文字链接',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    type: {
      type: '0',
      value: 'primary',
      required: true,
      title: '类型',
      optionType: 'select'
    },
    underline: {
      type: '0',
      value: true,
      title: '下划线',
      required: false,
      optionType: 'checkbox'
    },
    disabled: {
      type: '0',
      value: false,
      title: '禁用',
      required: false,
      optionType: 'checkbox'
    },
    href: {
      type: '0',
      value: '',
      title: '链接地址',
      required: false
    },
    icon: {
      type: '0',
      value: '',
      title: '图标',
      required: false,
      optionType: 'select'
    },
    target: {
      type: '0',
      value: '_blank',
      title: '打开方式',
      required: false
    }
  },
  list: []
}
