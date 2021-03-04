import widgetTypes from '@/components/factory/widgetTypes'
import { cloneDeep } from 'lodash'
import elCheckbox from './elCheckbox'
function addChild(elCheckbox, options) {
  const elCheckboxChild = cloneDeep(elCheckbox)
  elCheckboxChild.attrPosition = 'own'
  elCheckboxChild.attribute.label.value = options.label || ''
  delete elCheckboxChild.attribute.value
  return elCheckboxChild
}
export default {
  type: widgetTypes.basicElCheckboxGroup,
  tag: 'el-checkbox-group',
  description: {
    name: '复选框组',
    thumbnail: 'regular/keyboard'
  },
  className: '',
  attribute: {
    value: {
      type: '1',
      name: '',
      value: [],
      title: '值',
      variableType: 'array'
    },
    size: {
      type: '0',
      value: '',
      required: false,
      title: '大小',
      optionType: 'select'
    },
    disabled: {
      type: '0',
      value: false,
      required: false,
      title: '禁用',
      optionType: 'checkbox'
    },
    min: {
      type: '0',
      title: '可勾选最小数量',
      value: 0,
      required: false
    },
    max: {
      type: '0',
      title: '可勾选最大数量',
      value: 10,
      required: false
    },
    'text-color': {
      type: '0',
      value: '',
      required: false,
      title: '文本颜色'
    },
    fill: {
      type: '0',
      value: '',
      required: false,
      title: '填充颜色'
    }
  },
  list: [],
  child: [addChild(elCheckbox, {
    label: '复选1'
  }), addChild(elCheckbox, {
    label: '复选2'
  })]
}
