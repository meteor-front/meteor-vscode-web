<template>
  <div class="zl-page">
    <div class="zl-jenkins">
      <h4 class="zl-form-header">Jenkins配置</h4>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="地址">
          <el-input v-model="form.url" placeholder="请输入jenkins地址" />
        </el-form-item>
        <el-form-item label="token">
          <el-input v-model="form.token" />
        </el-form-item>
        <el-form-item label="Job名称">
          <el-input v-model="form.job" />
        </el-form-item>
        <el-form-item label="分支">
          <div class="zl-branch">
            <el-row v-for="branch in branches" :key="branch" :gutter="10">
              <el-col :span="14">
                <el-input v-model="branch.name" placeholder="请输入分支名称" />
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size="mini" circle icon="el-icon-plus" @click="addBranch" />
                <el-button v-if="branches.length > 1" type="primary" size="mini" circle icon="el-icon-minus" @click="minusBranch(branch)" />
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import { v4 as uuid } from 'uuid'
export default {
  data() {
    return {
      form: {
        url: '',
        token: '',
        job: ''
      },
      branches: [],
      vscode: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // eslint-disable-next-line no-undef
      this.vscode = acquireVsCodeApi()
      window.addEventListener('message', this.messageHandle)
      this.vscode && this.vscode.postMessage({
        command: 'getJenkinsConfig'
      })
    })
  },
  methods: {
    save() {
      // 过滤空分支
      this.branches = this.branches.filter((item) => {
        return item.name
      })
      this.vscode && this.vscode.postMessage({
        command: 'jenkinsSave',
        config: {
          ...this.form,
          branches: this.branches
        }
      })
    },
    messageHandle(event) {
      const message = event.data
      switch (message.command) {
        case 'backJenkinsConfig':
          this.form.url = message.config.url
          this.form.job = message.config.job
          this.form.token = message.config.token
          this.branches = message.config.branches
          break
        default:
          break
      }
    },
    // 添加分支
    addBranch() {
      this.branches.push({
        id: uuid(),
        name: ''
      })
    },
    // 减少分支
    minusBranch(branch) {
      this.branches = this.branches.filter((item) => {
        return item.id !== branch.id
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.zl-jenkins {
  max-width: 400px;
  margin: 30px auto;
  .zl-form-header {
    text-align: center;
    padding-bottom: 10px;
  }
}
.zl-branch {
  .el-row {
    margin: 0 0 8px 0 !important;
  }
}
</style>
