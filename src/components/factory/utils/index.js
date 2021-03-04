// 触发选择
function selectedWidget(vue, id, attribute) {
  vue.$store.commit('setWidgetSelected', {
    id,
    attribute
  })
  vue.$bus.$emit('widgetMessage', {
    type: 'select',
    id: id
  })
}

export default {
  selectedWidget
}
