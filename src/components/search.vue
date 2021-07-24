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
    <div class="zl-mode">
      <el-button v-if="$store.state.processor && tab === '3'" type="primary" size="mini" @click="showHandlerPop">处理人</el-button>
      <el-button-group class="ml10">
        <el-button v-for="mode in modeList" :key="mode.id" size="mini" :type="active === mode.key ? 'primary' : ''" @click="toggle(mode.key)">{{ mode.name }}</el-button>
      </el-button-group>
    </div>
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
      },
      active: 0,
      modeList: [{
        key: '0',
        name: '图形'
      }, {
        key: '1',
        name: '精简'
      }]
    }
  },
  computed: {
    placeholderSearch() {
      const tabNames = {
        '1': '页面',
        '2': '组件',
        '3': '页面/组件'
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
    this.active = this.$store.state.mode
  },
  methods: {
    showHandlerPop() {
      this.$emit('showHandlerPop')
    },
    fetchList(tag) {
      this.$bus.$emit('setTag', this.form.tag)
      this.$emit('fetchList', this.form)
    },
    toggle(key) {
      this.active = key
      this.$store.commit('setMode', key)
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
.ml10 {
  margin-left: 10px;
}
@media screen and (max-width: 550px) {
  .w100 {
    width: 80px;
  }
  .zl-filter.el-form {
    .el-input {
      margin-left: 10px;
    }
    .zl-search-btn {
      display: none;
    }
    /deep/ {
      margin-left: 10px;
      .el-form-item__label {
        display: none;
      }
      .el-input--mini .el-input__inner {
        width: 90px;
      }
    }
  }
}
.zl-mode {
  float: right;
  padding-right: 20px;
}
.el-dropdown-menu__item.active {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>
