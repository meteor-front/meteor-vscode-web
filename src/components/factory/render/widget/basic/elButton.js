import widget from '../widget'
export default class elButton extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
