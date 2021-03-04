export default {
  name: 'PageAttribute',
  props: {
    attribute: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  render: function(h) {
    const children = []
    if (this.attribute.type && this.$componentName[this.attribute.type]) {
      children.push(h(this.$componentName[this.attribute.type], {
        props: {
          attribute: this.$store.state.widgetAttribute
        }
      }))
    }
    return h('el-aside', {
      class: 'widget-config-container',
      props: {
        width: '240px'
      }
    }, children)
  }
}
