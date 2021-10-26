<template>
  <div class="zl-page">
    <div class="zl-jenkins">
      <h4 class="zl-form-header">Jenkins配置</h4>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="地址">
          <el-input v-model="form.url" placeholder="请输入jenkins地址" />
        </el-form-item>
        <el-form-item label="Job名称">
          <el-input v-model="form.job" />
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
        job: ''
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
        command: 'getJenkinsConfig'
      })
    })
  },
  methods: {
    save() {
      this.vscode && this.vscode.postMessage({
        command: 'jenkinsSave',
        config: {
          ...this.form
        }
      })
    },
    messageHandle(event) {
      const message = event.data
      switch (message.command) {
        case 'backJenkinsConfig':
          this.form.url = message.config.url
          this.form.job = message.config.job
          break
        case 'jenkinsSaveDone':
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
