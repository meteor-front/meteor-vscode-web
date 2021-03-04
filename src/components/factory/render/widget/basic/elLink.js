import widget from '../widget'
export default class elLink extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
