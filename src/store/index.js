import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    widgetSelected: '', // 选中元素id
    widgetAttribute: {}, // 选中元素属性
    widgetConfig: {}, // 选择元素时暂存
    widgetRenderIds: new Set(), // 所有组件id
    widgetSelect: {}, // 更换位置时暂存
    widgetCount: 0, // 组件数量，也是变量id
    global: {
      data: {},
      event: {},
      style: new Set()
    }
  },
  mutations: {
    setWidgetSelected(state, value) {
      state.widgetSelected = value.id
      state.widgetAttribute = value.attribute
    },
    setWidgetConfig(state, value) {
      state.widgetConfig = value
    },
    setWidgetRenderId(state, value) {
      if (!state.widgetRenderIds.has(value)) {
        state.widgetRenderIds.add(value)
      }
    },
    setWidgetSelect(state, value) {
      state.widgetSelect = value
    },
    setWidgetCount(state, value) {
      state.widgetCount = value
    },
    setGlobal(state, value) {
      state.global = Object.assign({}, state.global, value)
    },
    setStyle(state, value) {
      if (!state.global.style.has(value)) {
        state.global.style.add(value)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
