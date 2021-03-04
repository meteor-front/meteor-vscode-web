/* eslint-disable no-undef */
import { v4 as uuid } from 'uuid'
import utils from '../../utils'
import { cloneDeep } from 'lodash'
export default class Widget {
  constructor(vue) {
    this.attribute = vue.attribute
    // 用于跟vue通信
    this.$vue = vue
    this.uuid = uuid
    // 页面通用属性、事件
    this.property = {
      domProps: {},
      attrs: {
        id: this.attribute.id
      },
      nativeOn: {
        // 渲染组件点击事件（用于选择等）
        click: (e) => {
          e.stopPropagation()
          utils.selectedWidget(this.$vue, this.attribute.id, this.attribute)
        }
      },
      on: {},
      props: {}
    }
  }
  // 属性获取
  _getAttribute(attr) {
    if (attr.type === '0') {
      return attr.value
    } else if (attr.type === '1') {
      // 变量不存在，新建
      if (undefined === this.$vue.$store.state.global.data[attr.name]) {
        const count = this.$vue.$store.state.widgetCount
        attr.name = `var${count}`
        this.$vue.$store.state.global.data[attr.name] = cloneDeep(attr.value)
        this.$vue.$store.state.widgetCount += 1
      }
      // 这种返回会让global数据变化时，使得组件重新渲染
      return this.$vue.$store.state.global.data[attr.name]
    }
  }
  // 属性设置
  _setAttribute(attr, value) {
    if (attr.type === '0') {
      attr.value = value
    } else if (attr.type === '1') {
      this.$vue.$store.state.global.data[attr.name] = value
    }
  }
  _renderProperty(h, widget) {
    const self = widget
    const that = this
    const property = this.property
    for (const key in widget.attribute.attribute) {
      const attr = widget.attribute.attribute[key]
      if (!attr.extra) {
        switch (key) {
          case 'value':
            property.attrs.value = this._getAttribute(attr)
            property.on.input = function(val) {
              that._setAttribute(self.attribute.attribute.value, val)
              // 触发组件重新渲染
              self.attribute.attribute.value = Object.assign({}, self.attribute.attribute.value)
            }
            break

          default:
            if (attr.required !== false) {
              if (attr.optionType === 'checkbox') {
                property.attrs[key] = attr.required
              } else {
                property.attrs[key] = attr.value
              }
            }
            break
        }
      }
    }
    // 样式处理
    if (this.attribute.className) {
      property.class = widget.attribute.className
    }
  }
  _renderSlot(h, widget) {
    const slotChildren = []
    // slot处理
    if (widget.attribute.slot) {
      for (const key in widget.attribute.slot) {
        const slot = widget.attribute.slot[key]
        if (slot.required) {
          slotChildren.push(this._slotRender(h, widget, key, slot))
        }
      }
    }
    return slotChildren
  }
  // 组件通用渲染
  _render = (h, vue, children, property) => {
    if (property) {
      this.property = Object.assign(this.property, property)
    }
    if (children) {
      return h(vue.attribute.tag, this.property, children)
    } else {
      return h(vue.attribute.tag, this.property)
    }
  }
  // 渲染通用页面
  _renderPageCommon = (h, vue) => {
    return h('BasicPage', this.property)
  }
  // 容器通用渲染
  _containerRender = (h, vue, property) => {
    const self = this
    if (property) {
      this.property = Object.assign(this.property, property)
    }
    const children = []
    vue.attribute.list.forEach(widget => {
      children.push(h('widget', {
        props: {
          attribute: widget,
          parent: vue.attribute
        },
        key: widget.id
      }))
    })
    this.property.props.componentData = {
      attrs: {},
      props: {},
      on: {}
    }
    for (const key in vue.attribute.attribute) {
      const attr = vue.attribute.attribute[key]
      if (!attr.extra) {
        switch (key) {
          case 'value':
            this.property.props.componentData.attrs.value = this._getAttribute(attr)
            this.property.props.componentData.on.input = function(val) {
              self._setAttribute(vue.attribute.attribute.value, val)
              // 触发组件重新渲染
              vue.attribute.attribute.value = cloneDeep(vue.attribute.attribute.value)
            }
            break
          default:
            if (attr.required !== false) {
              if (attr.optionType === 'checkbox') {
                this.property.props.componentData.attrs[key] = attr.required
              } else if (attr.optionType === 'number') {
                this.property.props.componentData.attrs[key] = parseInt(attr.value)
              } else {
                this.property.props.componentData.attrs[key] = attr.value
              }
            }
            break
        }
      }
    }
    this.property.props.tag = vue.attribute.tag
    this.property.props.options = { group: 'widget', ghostClass: 'ghost' }
    this.property.props.list = vue.attribute.list
    this.property.on.add = (e) => {
      // 容器添加组件
      const newIndex = e.newIndex
      const id = this.uuid()
      if (vue.$store.state.widgetConfig) {
        vue.attribute.list.splice(newIndex, 1)
        const widgetConfig = cloneDeep(vue.$store.state.widgetConfig)
        widgetConfig.id = id
        if (Array.isArray(widgetConfig.list)) {
          Widget._setIdRecursion(widgetConfig)
        }
        vue.attribute.list.splice(newIndex, 0, {
          id,
          ...widgetConfig
        })
      } else {
        vue.attribute.list.splice(newIndex, 1)
        const widgetConfig = cloneDeep(vue.$store.state.widgetSelect)
        widgetConfig.id = id
        if (Array.isArray(widgetConfig.list)) {
          Widget._setIdRecursion(widgetConfig)
        }
        vue.attribute.list.splice(newIndex, 0, widgetConfig)
      }
      vue.attribute.list = vue.attribute.list.filter((item) => {
        return item.id
      })
      vue.$store.commit('setWidgetConfig', null)
      vue.$nextTick(() => {
        utils.selectedWidget(vue, id, vue.attribute.list[newIndex])
        // vue.$forceUpdate()
      })
    }
    this.property.on.choose = (e) => {
      vue.$store.commit('setWidgetSelect', vue.attribute.list[e.oldIndex])
    }
    return h('draggable', this.property, children)
  }
  static _setIdRecursion(widget) {
    widget.list.forEach(listItem => {
      if (!listItem.id) {
        listItem.id = uuid()
      }
      if (Array.isArray(listItem.list)) {
        Widget._setIdRecursion(listItem)
      }
    })
  }
  // slot渲染
  _slotRender = (h, vue, name, slot) => {
    const children = []
    slot.list.forEach(widget => {
      children.push(h('widget', {
        props: {
          attribute: widget,
          parent: vue.attribute
        },
        key: widget.id
      }))
    })
    const property = {
      props: {},
      on: {}
    }
    property.slot = name
    property.props.tag = 'div'
    property.props.options = { group: 'widget', ghostClass: 'ghost' }
    property.props.list = this.attribute.slot[name].list
    property.on.add = (e) => {
      const newIndex = e.newIndex
      const id = this.uuid()
      if (vue.$store.state.widgetConfig) {
        this.attribute.slot[name].list.splice(newIndex, 1)
        const widgetConfig = cloneDeep(vue.$store.state.widgetConfig)
        widgetConfig.id = id
        if (Array.isArray(widgetConfig.list)) {
          Widget._setIdRecursion(widgetConfig)
        }
        this.attribute.slot[name].list.splice(newIndex, 0, {
          id,
          ...vue.$store.state.widgetConfig
        })
      } else {
        this.attribute.slot[name].list.splice(newIndex, 1)
        const widgetConfig = cloneDeep(vue.$store.state.widgetSelect)
        widgetConfig.id = id
        if (Array.isArray(widgetConfig.list)) {
          Widget._setIdRecursion(widgetConfig)
        }
        this.attribute.slot[name].list.splice(newIndex, 0, widgetConfig)
      }
      // 删除没有id的数据，防止多余
      this.attribute.slot[name].list = this.attribute.slot[name].list.filter((item) => {
        return item.id
      })
      vue.$nextTick(() => {
        utils.selectedWidget(vue, id, vue.attribute)
      })
      vue.$store.commit('setWidgetConfig', null)
    }
    property.on.choose = (e) => {
      vue.$store.commit('setWidgetSelect', this.attribute.slot[name].list[e.oldIndex])
    }
    if (children.length === 0) {
      return h('draggable', Object.assign({
        style: {
          height: '100%',
          position: 'relative',
          minWidth: '80px'
        }
      }, property), [h('div', {
        style: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%'
        }
      }, '内容放这里')])
    } else {
      return h('draggable', property, children)
    }
  }
}
