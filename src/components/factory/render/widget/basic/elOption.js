import widget from '../widget'
export default class basicElOption extends widget {
  render = function(h, w) {
    w._renderProperty(h, this)
    return w._render(h, this)
  }
}
