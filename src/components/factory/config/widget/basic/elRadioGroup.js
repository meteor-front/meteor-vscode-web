import widgetTypes from '@/components/factory/widgetTypes'
import { cloneDeep } from 'lodash'
import elRadio from './elRadio'
function addChild(elRadio, options) {
  const elRadioChild = cloneDeep(elRadio)
  elRadioChild.attrPosition = 'own'
  elRadioChild.attribute.label.value = options.label || ''
  delete elRadioChild.attribute.value
  return elRadioChild
}
export default {
  type: widgetTypes.basicElRadioGroup,
  tag: 'el-radio-group',
  description: {
    name: '单选框组',
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
  child: [addChild(elRadio, {
    label: '单选1'
  }), addChild(elRadio, {
    label: '单选2'
  })]
}
