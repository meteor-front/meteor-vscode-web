import WidgetCode from '../widgetCode'
export default class BasicIcon extends WidgetCode {
  generate = function(node, slotCode, part) {
    return this.generateCommon(node, slotCode, part, 'i')
  }
}
