import WidgetCode from '../widgetCode'
export default class BasicElCheckboxGroup extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-checkbox-group')
  }
}
