<template>
  <el-form ref="form" class="zl-filter" :model="form" label-width="60px" size="mini" inline>
    <el-form-item label="分类">
      <el-select v-model="form.tag" filterable placeholder="分类" class="w100" @change="fetchList">
        <el-option v-for="tag in tagList" :key="tag.name" :label="tag.name" :value="tag.name" />
      </el-select>
    </el-form-item>
    <el-form-item label="">
      <el-input v-model="form.searchValue" :placeholder="placeholderSearch" @keyup.enter.native="fetchList" />
    </el-form-item>
    <el-form-item label="" class="zl-search-btn">
      <el-button type="primary" icon="el-icon-search" @click="fetchList">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script type="text/javascript">
export default {
  props: {
    tagList: {
      type: Array,
      default: function() {
        return []
      }
    },
    tab: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        tag: '',
        searchValue: '',
        badge: ''
      }
    }
  },
  computed: {
    placeholderSearch() {
      const tabNames = {
        '1': '页面',
        '2': '组件'
      }
      return `请输入${tabNames[this.tab]}名称，enter查询`
    }
  },
  created() {
    this.tagList.forEach(tag => {
      if (tag.own) {
        this.form.tag = tag.name
      }
    })
  },
  methods: {
    fetchList() {
      this.$emit('fetchList', this.form)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.zl-filter {
  margin-top: 10px;
  border-bottom: 1px solid #eee;
}
.zl-filter /deep/ {
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
}
.w100 {
  width: 100px;
}
@media screen and (max-width: 600px) {
  .zl-filter.el-form {
    .el-input {
      margin-left: 10px;
    }
    .zl-search-btn {
      display: none;
    }
  }
}
</style>
