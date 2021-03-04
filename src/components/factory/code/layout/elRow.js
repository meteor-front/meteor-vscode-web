import WidgetCode from '../widgetCode'
export default class BasicElHeader extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-row')
  }
}
