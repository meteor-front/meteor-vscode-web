import WidgetCode from '../widgetCode'
export default class BasicElRadioGroup extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-radio-group')
  }
}
