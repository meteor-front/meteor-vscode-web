import WidgetCode from '../widgetCode'
export default class LayoutElFooter extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-footer')
  }
}
