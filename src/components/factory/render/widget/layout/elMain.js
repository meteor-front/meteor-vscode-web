import widget from '../widget'
export default class elMain extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
