import widget from './widget'
export default class input extends widget {
  render = function(h, w) {
    const self = this
    const property = w.property
    for (const key in this.attribute.attribute) {
      const attr = this.attribute.attribute[key]
      switch (key) {
        case 'value':
          property.attrs.value = w._getAttribute(attr)
          property.on.input = function(val) {
            w._setAttribute(self.attribute.attribute.value, val)
            // 触发组件重新渲染
            self.attribute.attribute.value = Object.assign({}, self.attribute.attribute.value)
          }
          break

        default:
          if (attr.required !== false) {
            if (attr.optionType === 'checkbox') {
              property.attrs[key] = attr.required
            } else {
              property.attrs[key] = attr.value
            }
          }
          break
      }
    }
    const slotChildren = []
    // slot处理
    if (this.attribute.slot) {
      for (const key in this.attribute.slot) {
        const slot = this.attribute.slot[key]
        if (slot.required) {
          slotChildren.push(w._slotRender(h, this, key, slot))
        }
      }
    }
    // 样式处理
    if (this.attribute.className) {
      property.class = this.attribute.className
    }
    if (slotChildren.length > 0) {
      return w._render(h, this, slotChildren)
    } else {
      return w._render(h, this)
    }
  }
}
