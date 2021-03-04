import widget from '../widget'
export default class elCheckbox extends widget {
  render = function(h, widget) {
    console.log(this.parent.tag)
    if (this.parent.tag === 'el-checkbox-group') {
      delete this.attribute.attribute.value
    }
    return widget._containerRender(h, this)
  }
}
