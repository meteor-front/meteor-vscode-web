<template>
  <div class="container-attribute-item">
    <el-autocomplete v-model="parent.attribute.className" class="style-title" size="mini" placeholder="样式名称" :fetch-suggestions="fetchSuggestions" />
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'AttributeItem',
  data() {
    return {
    }
  },
  inject: ['parent'],
  mounted() {
  },
  methods: {
    fetchSuggestions(queryString, cb) {
      const res = []
      this.$store.state.global.style.forEach((styleItem) => {
        if (styleItem.includes(queryString)) {
          res.push({
            value: styleItem
          })
        }
      })
      cb(res)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.panel-editor-style {
  border: 1px solid #eee;
  height: 400px;
}
</style>
