import WidgetCode from '../widgetCode'
export default class LayoutElContainer extends WidgetCode {
  generate = function(node, slotCode, part) {
    let code = `<el-container`
    const codeEnd = `</el-container>`
    if (part === 'end') {
      return codeEnd
    }
    // 类名
    if (node.className) {
      code += ` class="${node.className}"`
    }
    code += `>`
    if (slotCode) {
      code += slotCode
    }
    if (part === 'front') {
      return code
    }
    code += codeEnd
    return code
  }
}
