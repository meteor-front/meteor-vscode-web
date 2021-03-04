<template>
  <div class="container-attribute-item">
    <h4 class="title">
      <span class="flex-1">{{ title }}</span>
      <div>
        <el-checkbox v-if="parent.slotForm[name].required !== undefined" v-model="parent.slotForm[name].required" @change="parent.changeSlot" />
      </div>
    </h4>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'AttributeItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    optionType: {
      type: String,
      default: 'input'
    }
  },
  data() {
    return {
    }
  },
  inject: ['parent'],
  created() {
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
