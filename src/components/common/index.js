import Vue from 'vue'
import widgetTypes from '@/components/factory/widgetTypes'
import basicText from '@/components/common/basicText'
import basicIcon from '@/components/common/basicIcon'
import basicBlock from '@/components/common/basicBlock'
import basicTextAttribute from '@/components/factory/attribute/basic/text'
import basicBlockAttribute from '@/components/factory/attribute/basic/block'
import basicIconAttribute from '@/components/factory/attribute/basic/icon'
import basicPage from '@/components/common/basicPage'
Vue.prototype.$componentName = {
  [widgetTypes.basicText]: basicTextAttribute.name,
  [widgetTypes.basicBlock]: basicBlockAttribute.name,
  [widgetTypes.basicIcon]: basicIconAttribute.name,
  [widgetTypes.basicPage]: basicPage.name
}
Vue.component(basicText.name, basicText)
Vue.component(basicBlock.name, basicBlock)
Vue.component(basicIcon.name, basicIcon)
Vue.component(basicTextAttribute.name, basicTextAttribute)
Vue.component(basicBlockAttribute.name, basicBlockAttribute)
Vue.component(basicIconAttribute.name, basicIconAttribute)
Vue.component(basicPage.name, basicPage)
