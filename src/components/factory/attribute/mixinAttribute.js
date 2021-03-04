import Widget from '@/components/factory/render/widget/widget'
import { cloneDeep } from 'lodash'
import styleItem from '@/components/factory/attribute/sub/styleItem'
import widgetOpitons from '@/components/factory/widgetOpitons'
import AttributeItem from '@/components/factory/attribute/sub/attributeItem'
export default {
  components: { styleItem, AttributeItem },
  props: {
    attribute: {
      type: Object,
      default: function() {
        return {
          attribute: {}
        }
      }
    }
  },
  data() {
    return {
      widgetAttribute: {},
      widget: {},
      attributeForm: {},
      globalData: {},
      val: '',
      attrTab: '1',
      slotForm: {},
      widgetOpitons: {}
    }
  },
  watch: {
    attribute: {
      deep: true,
      handler(val) {
        this.getAttribute()
      }
    }
  },
  provide() {
    return {
      parent: this
    }
  },
  created() {
    this.widget = new Widget(this)
    this.widgetOpitons = widgetOpitons
    this.getAttribute()
  },
  mounted() {
  },
  methods: {
    // 改变slot
    changeSlot() {
      this.attribute.slot = cloneDeep(this.slotForm)
    },
    // 属性tab事件切换
    handleTabClick() {

    },
    // 切换变量类型
    switchType(attr, type) {
      this.attribute.attribute[attr].type = type
    },
    // 改变属性
    change(attr) {
      this.attribute.attribute = cloneDeep(this.attributeForm)
    },
    // 改变全局变量
    changeGlobal() {
      this.$store.commit('setGlobal', cloneDeep(this.globalData))
    },
    // 输入框blur事件
    blur(attr) {
      if (this.attributeForm[attr].name !== this.attribute.attribute[attr].name) {
        if (this.globalData.data[this.attributeForm[attr].name] === undefined) {
          // 全局没有该变量，则新增新变量，删除老变量
          this.globalData.data[this.attributeForm[attr].name] = this.globalData.data[this.attribute.attribute[attr].name]
          delete this.globalData.data[this.attribute.attribute[attr].name]
        }
        this.$store.commit('setGlobal', cloneDeep(this.globalData))
        // 更新组件
        this.attribute.attribute[attr].name = this.attributeForm[attr].name
      }
    },
    getAttribute() {
      // 生拷贝属性，避免直接引起页面属性变化
      this.attributeForm = cloneDeep(this.attribute.attribute)
      this.slotForm = cloneDeep(this.attribute.slot)
      // 将global对象指引到组件，用于数据双向绑定
      this.globalData = cloneDeep(this.$store.state.global)
    }
  }
}
