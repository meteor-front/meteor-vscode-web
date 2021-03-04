import widgetTypes from '@/components/factory/widgetTypes'
export default {
  type: widgetTypes.basicElSelect,
  tag: 'el-select',
  description: {
    name: '选择器',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    value: {
      type: '1',
      name: '',
      value: '',
      title: '值'
    },
    placeholder: {
      type: '0',
      title: '占位符',
      value: '请选择122',
      required: false
    },
    multiple: {
      title: '多选',
      type: '0',
      value: false,
      optionType: 'checkbox',
      required: false
    },
    disabled: {
      title: '禁用',
      type: '0',
      value: false,
      optionType: 'checkbox',
      required: false
    },
    size: {
      title: '大小',
      type: '0',
      value: '',
      optionType: 'select',
      required: false
    },
    clearable: {
      title: '可清空',
      type: '0',
      value: false,
      optionType: 'checkbox',
      required: false
    },
    filterable: {
      title: '可搜索',
      type: '0',
      value: false,
      optionType: 'checkbox',
      required: false
    },
    'allow-create': {
      title: '允许用户创建新条目',
      type: '0',
      value: false,
      optionType: 'checkbox',
      required: false
    },
    options: {
      extra: true,
      type: '0',
      name: '',
      value: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }],
      title: '选项值',
      optionType: 'array'
    }
  },
  list: []
}
