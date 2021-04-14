<template>
  <div class="zl-page">
    <search ref="search" :tag-list="tagList" tab="2" @fetchList="fetchList" />
    <div v-loading="loading" class="zl-page-list">
      <div v-for="page in pageList" :key="page.id" class="zl-page-item">
        <div class="zl-page-head">
          <div class="zl-page-title">{{ page.description.name }}</div>
          <div class="zl-paeg-collect">
            <i :class="page.collection === '1' ? 'el-icon-star-on' : 'el-icon-star-off'" @click="collection(page)" />
          </div>
        </div>
        <div class="zl-page-container">
          <img :src="page.description.avatar || 'https://www.80fight.cn/zlst/default.png'" alt="">
          <div class="zl-app" @click="preview(page)" />
        </div>
        <div class="zl-page-mani">
          <el-button type="primary" circle size="mini" icon="el-icon-plus" @click="add(page)" />
          <el-button type="primary" circle size="mini" icon="el-icon-full-screen" @click="preview(page)" />
          <el-button type="primary" circle size="mini" icon="el-icon-edit" @click="modify(page)" />
          <el-button type="primary" circle size="mini" icon="el-icon-delete" @click="deletePage(page)" />
        </div>
        <div class="zl-page-mani-app">
          <el-button type="primary" circle size="mini" icon="el-icon-plus" @click="add(page)" />
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
import search from './../search.vue'

export default {
  components: { noData, search },
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
      pageNum: 1,
      pageSize: 10,
      totalCount: 1,
      pageList: [],
      loading: false
    }
  },
  created() {
    this.$bus.$on('refreshWidget', this.fetchList)
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    add(page) {
      this.$emit('add', {
        name: page.description.name,
        type: '0',
        description: `(${page.category})`
      })
    },
    collection(page) {
      this.$emit('collection', page)
    },
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
      const form = this.$refs.search.form
      request.get('widget?tag=' + form.tag + '&type=0&searchValue=' + form.searchValue).then((res) => {
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
    word-wrap:normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
.zl-paeg-collect {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
.zl-page-mani-app {
  display: none;
}
@media screen and (max-width: 550px) {
  .zl-page-item {
    &:hover {
      .zl-page-mani {
        display: none;
      }
    }
  }
  .zl-page-container {
    .zl-app {
      margin: auto;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
    }
  }
  .zl-page-mani-app {
    display: block;
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 9;
  }
}
</style>
