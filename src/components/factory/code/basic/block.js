import WidgetCode from '../widgetCode'
export default class BasicText extends WidgetCode {
  generate = function(node, slotCode, part) {
    const tag = 'div'
    let code = `<${tag}`
    const codeEnd = `</${tag}>`
    if (part === 'end') {
      return codeEnd
    }
    // 类名
    if (node.className) {
      code += ` class="${node.className}"`
    }
    code += `>`
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
