import WidgetCode from '../widgetCode'
export default class BasicElLink extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'el-link')
  }
}
