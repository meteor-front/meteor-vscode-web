import widget from '../widget'
export default class basicElSelect extends widget {
  render = function(h, w) {
    const self = this
    const property = w.property
    let children = []
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
          if (attr.extra) {
            if (key === 'options' && Array.isArray(attr.value)) {
              children = attr.value.map((item) => {
                return h('el-option', {
                  attrs: {
                    label: item.label,
                    value: item.value
                  }
                })
              })
            }
          } else if (attr.required !== false) {
            if (attr.optionType === 'checkbox') {
              property.attrs[key] = attr.required
            } else {
              property.attrs[key] = attr.value
            }
          }
          break
      }
    }
    // 样式处理
    if (this.attribute.className) {
      property.class = this.attribute.className
    }
    return w._render(h, this, children)
  }
}
