<template>
  <div id="pageContainer" class="page-container" :class="{'widget-empty': widgetForm.list.length == 0}">
    <widget-form
      ref="widgetForm"
      :data="widgetForm"
    />
    <el-button id="delete" type="danger" circle icon="el-icon-delete" size="mini" style="display: none" @click="deleteWidget" />
  </div>
</template>
<script type="text/javascript">
import WidgetForm from '../WidgetForm'

export default {
  name: 'PageContainer',
  components: {
    WidgetForm
  },
  props: {
    widgetForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    widgetFormSelect: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      isShift: false
    }
  },
  // watch: {
  //   widgetForm: {
  //     deep: true,
  //     handler: function() {
  //       console.log(this.$refs.widgetForm)
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('keyup', this.deleteWidget)
      document.addEventListener('keydown', this.keydownHandle)
    })
  },
  methods: {
    keydownHandle(e) {
      if (e.keyCode === 16) {
        this.isShift = true
        return
      }
      if (this.isShift) {
        if (e.keyCode === 8 && this.$store.state.widgetSelected) {
        // backspace按钮删除
          this.$bus.$emit(this.$store.state.widgetSelected, {
            type: 'delete'
          })
        } else if (e.keyCode === 38 && this.$store.state.widgetSelected) {
        // 选择上层组件
          this.$bus.$emit(this.$store.state.widgetSelected, {
            type: 'select',
            selectType: 'parent'
          })
        } else if (e.keyCode === 40 && this.$store.state.widgetSelected) {
        // 选择上层组件
          this.$bus.$emit(this.$store.state.widgetSelected, {
            type: 'select',
            selectType: 'none'
          })
        }
      }
    },
    // 删除组件
    deleteWidget(e) {
      if (e.keyCode === 17) {
        this.isShift = false
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
