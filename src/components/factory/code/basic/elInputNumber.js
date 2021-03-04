import WidgetCode from '../widgetCode'
export default class BasicElInputNumber extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-input-number')
  }
}
