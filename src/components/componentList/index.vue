<template>
  <div class="zl-page">
    <el-form ref="form" class="zl-filter" :model="form" label-width="80px" size="mini" inline>
      <el-form-item label="分类">
        <el-select v-model="form.tag" placeholder="分类" @change="selTag">
          <el-option v-for="tag in tagList" :key="tag.name" :label="tag.name" :value="tag.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.searchValue" placeholder="请输入组件名称" @keyup.enter.native="fetchList" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-search" @click="fetchList">查询</el-button>
      </el-form-item>
    </el-form>
    <div v-loading="loading" class="zl-page-list">
      <div v-for="page in pageList" :key="page.id" class="zl-page-item">
        <div class="zl-page-head">
          <div class="zl-page-title">{{ page.description.name }}</div>
        </div>
        <div class="zl-page-container">
          <img :src="page.description.avatar || 'https://www.80fight.cn/zlst/default.png'" alt="">
        </div>
        <div class="zl-page-mani">
          <el-button type="primary" circle size="mini" icon="el-icon-full-screen" @click="preview(page)" />
          <el-button type="primary" circle size="mini" icon="el-icon-edit" @click="modify(page)" />
          <el-button type="primary" circle size="mini" icon="el-icon-delete" @click="deletePage(page)" />
        </div>
      </div>
      <no-data v-if="pageList.length === 0 && !loading" />
    </div>
    <!-- <el-pagination
      class="zl-pagination"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->

  </div>
</template>
<script type="text/javascript">
import request from '@/util/request'
import noData from './../commons/noData.vue'
// import { cloneDeep } from 'lodash'

export default {
  components: { noData },
  props: {
    tagList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        tag: '',
        searchValue: ''
      },
      pageNum: 1,
      pageSize: 10,
      totalCount: 1,
      pageList: [],
      loading: false
    }
  },
  created() {
    this.tagList.forEach(tag => {
      if (tag.own) {
        this.form.tag = tag.name
      }
    })
    this.$bus.$on('refreshWidget', this.fetchList)
    this.fetchList()
  },
  methods: {
    preview(page) {
      this.$emit('preview', page)
    },
    deletePage(page) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.get('deleteComponent?id=' + page.id).then((res) => {
          if (res.code === 0) {
            this.fetchList()
          }
        }).catch((err) => {
          console.error(err)
        })
      })
    },
    modify(page) {
      this.$emit('componentModify', page)
    },
    selTag(tag) {
      this.fetchList()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.fetchList()
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchList()
    },
    fetchList() {
      this.loading = true
      request.get('widget?tag=' + this.form.tag + '&type=0&searchValue=' + this.form.searchValue).then((res) => {
        this.pageList = res.data
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.error(err)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.zl-page {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.zl-filter {
  margin-top: 20px;
}
.zl-page-list {
  flex: 1;
  overflow: auto;
  padding: 10px 20px 20px 20px;
  background-color: #f5f5f5;
  min-height: 200px;
}
.zl-page-item {
  position: relative;
  display: inline-block;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 3px #eee;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-bottom: 26px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgba(78, 176, 123, 0.078);
  border: 1px solid rgba(78, 176, 124, 0.3);
  &:hover {
    .zl-page-mani {
      display: block;
    }
  }
}
.zl-page-head {
  position: absolute;
  z-index: 9;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 10px;
  background-color: #4eb07b;
  .zl-page-title {
    flex: 1;
    color: #fff;
  }
  .zl-page-type {
    color: #fff;
  }
}
.zl-page-container {
  position: relative;
  width: 175px;
  height: 120px;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 175px;
    max-height: 120px;
  }
}
.zl-page-mani {
  display: none;
  position: absolute;
  right: 8px;
  top: 8px;
}
.zl-pagination {
  padding: 10px;
  text-align: center;
}
</style>
