import widget from '../widget'
export default class basicElInputNumber extends widget {
  render = function(h, w) {
    w._renderProperty(h, this)
    return w._render(h, this)
  }
}
