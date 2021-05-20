<template>
  <div class="zl-page">
    <div class="zl-cloud">
      <h4 class="zl-form-header">容器云配置</h4>
      <el-form ref="form" :model="form" label-width="90px" size="mini">
        <el-form-item label="容器云地址">
          <el-input v-model="form.url" placeholder="请输入容器云地址" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="环境id">
          <el-input v-model="form.id" placeholder="请输入环境id" />
        </el-form-item>
        <el-form-item label="服务名称">
          <el-input v-model="form.name" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        url: '',
        username: '',
        password: '',
        id: '',
        name: ''
      },
      vscode: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // eslint-disable-next-line no-undef
      this.vscode = acquireVsCodeApi()
      window.addEventListener('message', this.messageHandle)
      this.vscode && this.vscode.postMessage({
        command: 'getCloudConfig'
      })
    })
  },
  methods: {
    save() {
      // 过滤空分支
      this.vscode && this.vscode.postMessage({
        command: 'cloudSave',
        config: {
          ...this.form
        }
      })
    },
    messageHandle(event) {
      const message = event.data
      switch (message.command) {
        case 'backCloudConfig':
          this.form.url = message.config.url
          this.form.username = message.config.username
          this.form.password = message.config.password
          this.form.name = message.config.name
          this.form.id = message.config.id
          break
        case 'cloudSaveDone':
          this.$message({
            message: '保存成功！',
            type: 'success'
          })
          break
        default:
          break
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.zl-cloud {
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
