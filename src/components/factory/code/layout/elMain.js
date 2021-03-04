import WidgetCode from '../widgetCode'
export default class LayoutElMain extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-main')
  }
}
