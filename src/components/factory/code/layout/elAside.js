import WidgetCode from '../widgetCode'
export default class LayoutElAside extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-aside')
  }
}
