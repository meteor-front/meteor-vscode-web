export default class WidgetCode {
  // 通用generate方法
  generate(node, slotCode) {

  }
  // 通用生成
  generateCommon(node, slotCode, part, tag) {
    let code = `<${tag}`
    const codeEnd = `</${tag}>`
    if (part === 'end') {
      return codeEnd
    }
    // 类名
    if (node.className) {
      code += ` class="${node.className}"`
    }
    for (const key in node.attribute) {
      const attr = node.attribute[key]
      if (!attr.extra) {
        if ((typeof attr.required === 'undefined') || (typeof attr.required === 'boolean' && attr.required)) {
          // 常量 0、变量 1
          if (attr.type === '0') {
            if (attr.optionType === 'number') {
              code += ` :${key}="${attr.value}"`
            } else {
              code += ` ${key}="${attr.value}"`
            }
          } else if (attr.type === '1') {
            if (key === 'value') {
              code += ` v-model="${attr.name}"`
            } else {
              code += ` :${key}="${attr.name}"`
            }
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
  // 生成import
  generateImport(data, imported) {
    let importCode = ''
    const components = []
    for (let i = 0; i < data.code.length; i++) {
      const code = data.code[i]
      const name = code.name.replace(/\..*$/gi, '')
      if (!imported.has(name) || (imported.has(name) && imported.get(name).indexOf(code.position) === -1)) {
        importCode += `import ${name} from '${code.position}/${name}'\n`
        imported.set(name, [code.position])
        components.push(code)
      }
    }
    return {
      importCode: importCode,
      components
    }
  }
}
