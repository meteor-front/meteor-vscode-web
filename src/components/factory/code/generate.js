import generate from './index'
function generateCode(data) {
  // console.log('list', data)
  let code = ''
  // 开始标签代码
  if (data && data.type) {
    code = new generate[data.type]().generate(data, '', 'front')
    // console.log('front', code)
  }
  // 内部代码
  if (data.list && data.list.length > 0) {
    let codeList = ''
    for (let i = 0; i < data.list.length; i++) {
      codeList += generateCode(data.list[i])
    }
    // console.log('codeList', codeList)
    code += codeList
  } else if (data.slot) {
    // slot代码生成
    let codeSlot = ''
    for (const key in data.slot) {
      const slot = data.slot[key]
      // 具名slot
      if (slot.required && slot.list && slot.list.length > 0) {
        codeSlot += `<div slot="${key}">`
        for (let i = 0; i < slot.list.length; i++) {
          codeSlot += generateCode(slot.list[i])
        }
        codeSlot += '</div>'
      }
    }
    code += codeSlot
  }
  // 结束标签代码
  if (data && data.type) {
    const endCode = new generate[data.type]().generate(data, '', 'end')
    // console.log('endCode', endCode)
    code += endCode
  }
  return code
}

function generateImport(data) {
  let code = ''
  // 内部代码
  if (data.list && data.list.length > 0) {
    let codeList = ''
    for (let i = 0; i < data.list.length; i++) {
      codeList += generateImport(data.list[i])
    }
    code += codeList
  } else if (data.code) {
    const importInfo = new generate[data.type]().generateImport(data, imported)
    code += importInfo.importCode
    componentsList = componentsList.concat(importInfo.components)
  }
  return code
}

let imported = new Map()
let componentsList = []

function getComponents() {
  return componentsList
}

function initComponents() {
  componentsList = []
}

function initImported() {
  imported = new Map()
}

export default {
  generateCode,
  generateImport,
  imported,
  initImported,
  componentsList,
  getComponents,
  initComponents
}
