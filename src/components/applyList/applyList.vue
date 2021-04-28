<template>
  <div class="zl-page" :class="$store.state.mode === '1' ? 'simple' : ''">
    <search ref="search" :tag-list="tagList" tab="3" @fetchList="fetchList" @showHandlerPop="showHandlerPop" />
    <div v-loading="loading" class="zl-page-list">
      <div v-for="page in pageList" :key="page.id" class="zl-page-item">
        <div class="zl-page-head">
          <div class="zl-page-title">{{ page.description.name }}</div>
          <div class="zl-page-collect">
            <i class="el-icon-view" @click="modify(page)" />
            <i class="el-icon-close" @click="applyResult(false, page)" />
            <i class="el-icon-check" @click="applyResult(true, page)" />
          </div>
        </div>
        <div class="zl-page-container">
          <div class="zl-badge">{{ page.type === '1' ? '页' : '组' }}</div>
          <img :src="page.description.avatar || 'https://www.80fight.cn/zlst/default.png'" alt="" @click="preview(page)">
        </div>
      </div>
      <no-data v-if="pageList.length === 0 && !loading" />
    </div>

    <el-dialog
      title="处理人列表"
      :visible.sync="visible"
      width="400"
    >
      <el-form ref="form" :model="form" label-width="80px" inline size="mini">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入姓名" @change="queryUserList" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="mini" @click="queryUserList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="processors"
        size="mini"
        height="300px"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          header-align="center"
          align="center"
          width="70"
        />
        <el-table-column
          prop="name"
          label="名称"
          width="90"
        />
        <el-table-column
          header-align="center"
          align="center"
          prop="processor"
          label="处理人"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.processor === '1'" class="c-green">是</span>
            <span v-else class="c-red">否</span>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.processor === '1'" type="text" size="mini" @click="processorMani('0', scope.row)">取消</el-button>
            <el-button v-else type="text" size="mini" @click="processorMani('1', scope.row)">指定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button size="mini" @click="visible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import request from '@/util/request'
import search from '../search.vue'
import noData from '../commons/noData.vue'

export default {
  components: { search, noData },
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
      loading: false,
      visible: false,
      form: {
        name: ''
      },
      processors: []
    }
  },
  created() {
    this.$bus.$on('refreshWidget', this.fetchList)
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    modify(page) {
      console.log(page)
      if (page.type === '1') {
        this.$emit('pageModify', page)
      } else {
        this.$emit('componentModify', page)
      }
    },
    queryUserList() {
      request.get('queryUserList', {
        params: {
          name: this.form.name
        }
      }).then((res) => {
        this.processors = res.processor
      }).catch((err) => {
        console.error(err)
      })
    },
    processorMani(processor, row) {
      let message = '确定指定?'
      if (processor === '0') {
        message = '确定取消?'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post('/updateUser', {
          processor: processor,
          token: row.token
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
            row.processor = processor
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.error(err)
        })
      }).catch(() => {
      })
    },
    showHandlerPop() {
      this.queryUserList()
      this.visible = true
    },
    applyResult(agree, page) {
      let message = '确定拒绝?'
      if (agree) {
        page.userId = '999999999'
        message = '确定通过?'
      }
      page.apply = ''
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.post('/applyAgree', page).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: '处理成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '处理失败',
              type: 'success'
            })
          }
          this.fetchList()
        }).catch((err) => {
          console.error(err)
        })
      }).catch(() => {
      })
    },
    preview(page) {
      this.$emit('preview', page)
    },
    fetchList() {
      const form = this.$refs.search.form
      this.loading = true
      request.get('widget?tag=' + form.tag + '&searchValue=' + form.searchValue + '&apply=1').then((res) => {
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
  padding: 5px;
  background-color: #4eb07b;
  .zl-page-title {
    flex: 1;
    color: #fff;
    word-wrap:normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    line-height: 18px;
  }
  .zl-page-type {
    color: #fff;
  }
}
.zl-page-container {
  position: relative;
  width: 175px;
  height: 80px;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 175px;
    max-height: 80px;
    cursor: pointer;
  }
}
.zl-page-mani {
  display: none;
  position: absolute;
  right: 8px;
  top: 8px;
  i {
    font-size: 18px;
    cursor: pointer;
    color: #409EFF;
  }
}
.zl-pagination {
  padding: 10px;
  text-align: center;
}
.zl-page-collect {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  i + i {
    margin-left: 5px;
  }
}
.zl-page-mani-app {
  display: none;
}
.zl-btn-apply {
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  + .zl-btn-apply {
    margin-left: 6px;
  }
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
    display: inline-block;
    margin: 2px 4px 0 0;
    color: #fff;
  }
}
.zl-page.simple {
  .zl-page-item {
    padding-bottom: 0;
  }
  .zl-page-head {
    position: relative;
    width: 175px;
  }
  .zl-page-container {
    display: none;
  }
}
.zl-badge {
  position: absolute;
  top: 2px;
  left: 2px;
  color: #fff;
  z-index: 99;
  font-size: 12px;
  background: #f8934a;
  padding: 2px 4px;
  border-radius: 2px;
}
</style>
