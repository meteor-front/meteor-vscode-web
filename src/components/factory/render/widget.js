import Widget from './widget/index'
import utils from '@/components/factory/utils/index.js'
// import { v4 as uuid } from 'uuid'
export default {
  props: {
    attribute: {
      type: Object,
      default: function() {
        return {}
      }
    },
    parent: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  render: function(h) {
    if (this.attribute.code && this.attribute.id) {
      // 页面渲染
      if (!this.$store.state.widgetRenderIds.has(this.attribute.id)) {
        this.$bus.$on(this.attribute.id, this.widgetMessageSingle)
        this.$bus.$on('widgetMessage', this.widgetMessage)
        this.$store.commit('setWidgetRenderId', this.attribute.id)
      }
      const widget = new Widget.PageCommon(this)
      return widget.render.bind(this, h, widget)()
    } else if (this.attribute && this.attribute.tag && this.attribute.id) {
      // 存在类型才渲染
      if (!this.$store.state.widgetRenderIds.has(this.attribute.id)) {
        // console.log('renderIn', this.attribute.id)
        this.$bus.$on(this.attribute.id, this.widgetMessageSingle)
        this.$bus.$on('widgetMessage', this.widgetMessage)
        this.$store.commit('setWidgetRenderId', this.attribute.id)
      }
      // console.log('render', this.attribute)
      const widget = new Widget[this.attribute.type](this)
      return widget.render.bind(this, h, widget)()
    }
  },
  methods: {
    // 组件消息, 通过type判断消息类型
    widgetMessage(message) {
      switch (message.type) {
        case 'select':
          this.select(message)
          break

        default:
          break
      }
    },
    _deleteFilter(list) {
      return list.filter((widget) => {
        console.log(widget.id + ' - ' + this.attribute.id)
        if (widget.id === this.attribute.id) {
          this.$bus.$off(this.attribute.id, this.widgetMessageSingle)
          this.$bus.$off('widgetMessage', this.widgetMessage)
        } else {
          return widget.id !== this.attribute.id
        }
      })
    },
    widgetMessageSingle(message) {
      switch (message.type) {
        case 'delete':
          // 解绑事件
          if (this.parent.list) {
            // list列表中查找
            this.parent.list = this._deleteFilter(this.parent.list)
          }
          // slot中查找
          if (this.parent.slot) {
            for (const key in this.parent.slot) {
              const slot = this.parent.slot[key]
              if (slot.list) {
                slot.list = this._deleteFilter(slot.list)
              }
            }
          }
          document.getElementById('delete').style = 'display: none;'
          break
        case 'update':
          if (message.from === 'global') {
            this.attribute.attribute.value = Object.assign({}, this.attribute.attribute.value)
          }
          break
        case 'select':
          this.select(message)
          break

        default:
          break
      }
    },

    // 选择处理
    select(message) {
      if (message.selectType === 'parent') {
        // 选择父组件
        utils.selectedWidget(this, this.parent.id, this.parent)
      } else if (message.selectType === 'none') {
        // 选择父组件
        utils.selectedWidget(this, '', {})
      } else {
        // eslint-disable-next-line no-case-declarations
        const dom = document.getElementById(this.attribute.id)
        if (message.id === this.attribute.id) {
          dom.setAttribute('selected', 'selected')
          // const rect = dom.getBoundingClientRect()
          // const scrollTop = document.getElementById('pageContainer').scrollTop
          // document.getElementById('delete').style = `display:block; position: absolute; z-index: 999; left: ${rect.left + rect.width - 240}px; top: ${rect.y + rect.height + scrollTop - 55}px;`
        } else {
          if (dom && dom.hasAttribute('selected')) {
            dom.removeAttribute('selected')
          }
        }
      }
    }
  }
}
