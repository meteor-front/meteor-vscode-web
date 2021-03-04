import widgetTypes from '@/components/factory/widgetTypes'
import { cloneDeep } from 'lodash'
import elText from './text'
const text = cloneDeep(elText)
text.attrPosition = 'parent'
text.attribute = {
  text: {
    type: '0',
    value: '复选框',
    required: true,
    title: '名称'
  }
}
export default {
  type: widgetTypes.basicElCheckbox,
  tag: 'el-checkbox',
  description: {
    name: '复选框',
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
    label: {
      type: '0',
      value: '标签',
      title: '标签'
    },
    disabled: {
      type: '0',
      value: false,
      required: false,
      title: '禁用',
      optionType: 'checkbox'
    },
    border: {
      type: '0',
      value: false,
      required: false,
      title: '显示边框',
      optionType: 'checkbox'
    },
    size: {
      type: '0',
      value: '',
      required: false,
      title: '大小',
      optionType: 'select'
    },
    checked: {
      type: '0',
      value: false,
      required: false,
      title: '是否勾选',
      optionType: 'checkbox'
    },
    'true-label': {
      type: '0',
      value: '',
      title: '选中时的值',
      required: false
    },
    'false-label': {
      type: '0',
      value: '',
      title: '没有选中时的值',
      required: false
    }
  },
  list: [],
  child: [text]
}
