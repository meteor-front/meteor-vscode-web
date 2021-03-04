<template>
  <draggable id="widgetFormContainer" :list="data.list" :options="{group:'widget', ghostClass: 'ghost'}" class="widget-form-container" @choose="choose" @update="update" @remove="widgetremove" @end="handleMoveEnd" @add="widgetAdd">
    <widget v-for="(item, index) in data.list" :key="index" :attribute="item" :parent="data" />
  </draggable>
</template>

<script>
import { v4 as uuid } from 'uuid'
import Draggable from 'vuedraggable'
// import WidgetFormItem from './WidgetFormItem'
import Widget from '@/components/factory/render/widget'
import utils from '@/components/factory/utils/index.js'
import { cloneDeep } from 'lodash'

export default {
  components: {
    Draggable,
    Widget
  },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  methods: {
    choose(e) {
      this.$store.commit('setWidgetSelect', this.data.list[e.oldIndex])
    },
    update() {
      console.log('update', arguments)
    },
    widgetremove(e) {
      console.log('remove', e.oldIndex)
    },
    handleMoveEnd({ newIndex, oldIndex }) {
      console.log('end', newIndex, oldIndex)
    },
    setIdRecursion(widget) {
      widget.list.forEach(listItem => {
        if (!listItem.id) {
          listItem.id = uuid()
        }
        if (Array.isArray(listItem.list)) {
          this.setIdRecursion(listItem)
        }
      })
    },
    widgetAdd(evt) {
      const newIndex = evt.newIndex
      const id = uuid()
      // 添加的时候，进行删除
      if (this.$store.state.widgetConfig) {
        this.data.list.splice(newIndex, 1)
      }
      // 需要深度拷贝，防止对象指针引起难以定位问题
      const widgetConfig = cloneDeep(this.$store.state.widgetConfig)
      // 给子组件添加id
      if (Array.isArray(widgetConfig.list)) {
        this.setIdRecursion(widgetConfig)
      }
      widgetConfig.id = id
      // console.log('widgetAdd', widgetConfig)
      this.data.list.splice(newIndex, 0, widgetConfig)
      this.$nextTick(() => {
        utils.selectedWidget(this, id, this.data.list[newIndex])
      })
      this.$store.commit('setWidgetConfig', null)
      // this.selectWidget = this.data.list[newIndex]
    }
  }
}
</script>
