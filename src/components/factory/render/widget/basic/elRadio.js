import widget from '../widget'
export default class elRadio extends widget {
  render = function(h, widget) {
    if (this.parent.tag === 'el-radio-group') {
      delete this.attribute.attribute.value
    }
    return widget._containerRender(h, this)
  }
}
