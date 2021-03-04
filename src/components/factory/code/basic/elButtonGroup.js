import WidgetCode from '../widgetCode'
export default class BasicElButtonGroup extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-button-group')
  }
}
