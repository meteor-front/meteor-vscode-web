import widget from '../widget'
export default class text extends widget {
  render = function(h, w) {
    const property = w.property
    for (const key in this.attribute.attribute) {
      const attr = this.attribute.attribute[key]
      if (attr.required !== false) {
        if (attr.optionType === 'checkbox') {
          property.attrs[key] = attr.required
        } else {
          property.attrs[key] = attr.value
        }
      }
    }
    // 样式处理
    if (this.attribute.className) {
      property.class = this.attribute.className
    }
    return w._render(h, this)
  }
}
