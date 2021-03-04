import widget from '../widget'
export default class elCheckboxGroup extends widget {
  render = function(h, widget) {
    return widget._containerRender(h, this)
  }
}
