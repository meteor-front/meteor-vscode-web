import WidgetCode from '../widgetCode'
export default class BasicText extends WidgetCode {
  generate = function(node, slotCode, part) {
    let code = ''
    const codeEnd = ''
    if (part === 'end') {
      return codeEnd
    }
    if (node.attribute && node.attribute.text) {
      code += node.attribute.text.value
    }
    if (part === 'front') {
      return code
    }
    code += codeEnd
    return code
  }
}
