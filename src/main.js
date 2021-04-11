import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/util/request'
import PageFactory from './page'
import widgetConfig from '@/components/factory/config/widget'
import Draggable from 'vuedraggable'
import Widget from '@/components/factory/render/widget'
import '@/components/common/index'
import ZoomOnHover from 'vue-zoom-on-hover'

// 将属性组件挂载到全局
import ComponentAttribute from '@/components/factory/attribute/index'
Vue.config.productionTip = false
Vue.prototype.$http = request.http
Vue.prototype.$bus = new Vue()
Vue.prototype.widgetConfig = widgetConfig
Vue.prototype.$componentName = Object.assign(Vue.prototype.$componentName, ComponentAttribute.componentName)
Vue.use(ElementUI)
Vue.use(PageFactory)
Vue.use(ZoomOnHover)
Vue.component('draggable', Draggable)
Vue.component('widget', Widget)
for (const key in ComponentAttribute.component) {
  const componentAttribute = ComponentAttribute.component[key]
  Vue.component(componentAttribute.name, componentAttribute)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
