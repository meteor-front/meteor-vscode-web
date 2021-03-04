import widget from '../widget'
export default class elAside extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
