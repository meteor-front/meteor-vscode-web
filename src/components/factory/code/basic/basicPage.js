import WidgetCode from '../widgetCode'
export default class BasicPage extends WidgetCode {
  generate = function(node, slotCode, part) {
    if (part === 'front') {
      let code = ''
      if (node.code) {
        for (let i = 0; i < node.code.length; i++) {
          const component = node.code[i]
          const name = component.name.replace(/\..*$/gi, '')
          code += `<${name}></${name}>\n`
        }
      }
      return code
    } else {
      return ''
    }
  }
}
