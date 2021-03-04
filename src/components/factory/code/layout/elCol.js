import WidgetCode from '../widgetCode'
export default class LayoutElHeader extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-col')
  }
}
