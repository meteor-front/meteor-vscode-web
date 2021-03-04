import widget from '../widget'
export default class elRow extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
