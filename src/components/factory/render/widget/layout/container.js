import widget from '../widget'
export default class container extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
