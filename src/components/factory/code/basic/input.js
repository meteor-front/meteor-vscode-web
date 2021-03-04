import WidgetCode from '../widgetCode'
export default class BasicInputCode extends WidgetCode {
  generate = function(node, slotCode, part) {
    let code = `<el-input`
    const codeEnd = `</el-input>`
    if (part === 'end') {
      return codeEnd
    }
    // 类名
    if (node.className) {
      code += ` class="${node.className}"`
    }
    for (const key in node.attribute) {
      const attr = node.attribute[key]
      // required
      if ((typeof attr.required === 'undefined') || (typeof attr.required === 'boolean' && attr.required)) {
        // 常量 0、变量 1
        if (attr.type === '0') {
          code += ` ${key}="${attr.value}"`
        } else if (attr.type === '1') {
          if (key === 'value') {
            code += ` v-model="${attr.name}"`
          } else {
            code += ` :${key}="${attr.name}"`
          }
        }
      }
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
