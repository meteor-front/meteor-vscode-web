import widget from '../widget'
export default class text extends widget {
  render = function(h, w) {
    const property = w.property
    property.attrs.id = this.attribute.id
    property.attrs.src = this.attribute.description.avatar
    // 样式处理
    property.class = this.attribute.className || 'attribute-page-common'
    return w._renderPageCommon(h, this)
  }
}
