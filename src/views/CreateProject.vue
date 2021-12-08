<template>
  <div class="zl-page">
    <div class="zl-header flex">
      <img class="zl-logo" src="~@/assets/images/logo.png">
      <h4 class="ml20">创建工程</h4>
      <span class="ml10">中铝视拓创建新工程指引，快速创建各端应用工程</span>
    </div>
    <div class="zl-container">
      <el-form ref="form" label-width="80px" :model="form" :rules="rules" size="mini">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="本地目录" prop="baseDir">
              <div class="zl-dir">
                <div class="point" @click="openFolder" />
                <el-input v-model="form.baseDir" readonly placeholder="请选择本地目录">
                  <i slot="suffix" class="el-icon-folder" />
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="projectName" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="模板">
              <el-tabs v-model="activeTemplate" @tab-click="selectTemplateType">
                <el-tab-pane v-for="(template, templateId) in templateObj" :key="templateId" :name="template.id">
                  <div slot="label" class="zl-template">
                    <img :src="template.icon">
                    <span>{{ template.name }}</span>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div class="m-template">
                <div v-for="template in templateList" :key="template.id" class="item item-template" :class="{'select': template.id === templateIndex}" @click="selectTemplate(template)">
                  <img class="sel" :src="selImg">
                  <img :src="template.thumbnail">
                  <h4>{{ template.name }}</h4>
                  <p>{{ template.description }}</p>
                </div>
              </div>
              <el-input v-model="url" placeholder="可手动输入也可选择下面模板" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="仓库">
              <el-input v-model="hub" placeholder="请输入仓库地址" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div id="loading" class="loading" :class="{'hide' : !loading}">
        <img :src="loadingImage">
      </div>
      <!-- 账号信息弹框 -->
      <el-dialog
        title="账号信息"
        :visible.sync="visibleAccount"
        width="400px"
      >
        <el-form ref="formAccount" :model="formAccount" :rules="ruleAccount" label-width="60px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formAccount.name" placeholder="邮箱地址或用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formAccount.password" type="password" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="visibleAccount = false">取 消</el-button>
          <el-button type="primary" @click="loginByAccount">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="zl-footer">
      <el-button class="ml110 mt4 w80" type="primary" size="mini" @click="createProject">确定</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import utils from '@/util/utils'
export default {
  name: 'Home',
  data() {
    return {
      vscode: null,
      form: {
        baseDir: ''
      },
      currentCount: '',
      templateObj: [{
        id: '0',
        icon: utils.imgs.vue,
        name: 'Web端',
        description: '创建web端使用工程',
        selected: true,
        list: [{
          id: '0',
          selected: false,
          git: 'http://git.cs2025.com/front/zlst-ele-templete.git',
          name: 'zlst-ele-template',
          description: '基于vue、element-ui的基础工程',
          thumbnail: utils.imgs.pcweb
        }]
      }, {
        id: '1',
        icon: utils.imgs.react,
        name: 'APP',
        description: '快速创建APP',
        selected: true,
        list: [{
          id: '0',
          selected: false,
          git: 'http://git.cs2025.com/fengli/RNBaseApp.git',
          name: 'RNBaseApp',
          description: 'react-native基础工程',
          thumbnail: 'https://www.80fight.cn/vsce/rnb.png'
        }]
      }, {
        id: '2',
        icon: utils.imgs.mini,
        name: '小程序',
        description: '小程序模板',
        selected: true,
        list: [{
          id: '0',
          selected: false,
          git: 'https://github.com/meteor-front/mini-template.git',
          name: 'mini-template',
          description: '原生小程序开发模板',
          thumbnail: 'https://www.80fight.cn/vsce/miniapp.png'
        }]
      }],
      templateList: [],
      projectName: '',
      hub: 'http://git.cs2025.com/front/zlst-ele-templete.git',
      url: '',
      selImg: utils.imgs.sel,
      templateTypeIndex: 0,
      templateIndex: 0,
      loading: false,
      loadingImage: utils.imgs.loading,
      visibleAccount: false,
      formAccount: {
        name: '',
        password: ''
      },
      ruleAccount: {
        name: { required: true, message: '请输入账号名称', trigger: 'blur' },
        password: { required: true, message: '请输入账号密码', trigger: 'blur' }
      },
      rules: {
        baseDir: { required: true, message: '请选择本地存放目录', trigger: 'blur' },
        projectName: { required: true, message: '请输入工程名称', trigger: 'blur' }
      },
      activeTemplate: '0'
    }
  },
  watch: {
    projectName(val) {
      this.hub = this.hub.replace(/\/[^\/]*$/gi, '') + '/' + val + '.git'
    }
  },
  created() {
    // this.requestDemo()
  },
  mounted() {
    this.selectTemplateType({
      id: '0'
    })
    this.$nextTick(() => {
      // eslint-disable-next-line no-undef
      this.vscode = acquireVsCodeApi()
      window.addEventListener('message', this.messageHandle)
    })
  },
  methods: {
    requestDemo() {
      this.$http.get('/warehouseIn').then((res) => {
        console.log(res)
      }).catch((err) => {
        console.error(err)
      })
    },
    // 通过账号登录
    loginByAccount() {
      this.$refs['formAccount'].validate((valid) => {
        if (valid) {
          this.visibleAccount = false
          this.loading = true
          this.vscode.postMessage({
            command: 'create',
            url: this.url,
            hub: this.hub,
            projectName: this.projectName,
            baseDir: this.form.baseDir,
            account: this.formAccount
          })
        } else {
          return false
        }
      })
    },
    // 创建新工程
    createProject() {
      if (!this.form.baseDir) {
        return this.$message({
          message: '请选择项目存放本地目录！',
          type: 'warning'
        })
      }
      if (!this.projectName) {
        return this.$message({
          message: '请输入项目名称！',
          type: 'warning'
        })
      }
      this.loading = true
      this.vscode.postMessage({
        command: 'create',
        url: this.url,
        hub: this.hub,
        projectName: this.projectName,
        baseDir: this.form.baseDir
      })
    },
    // 选择模板
    selectTemplate(template) {
      this.templateIndex = template.id
      this.setUrl()
    },
    // 选择模板类型
    selectTemplateType() {
      this.templateObj.forEach(templateItem => {
        if (this.activeTemplate === templateItem.id) {
          templateItem.selected = true
          this.templateList = templateItem.list
        } else {
          templateItem.selected = false
        }
      })
      this.templateTypeIndex = this.activeTemplate
      this.templateIndex = '0'
      this.setUrl()
    },
    // 设置模板地址
    setUrl() {
      this.url = this.templateList[this.templateIndex].git
    },
    // 处理来自vscode的事件
    messageHandle(event) {
      const message = event.data
      switch (message.command) {
        case 'refactor':
          this.currentCount = Math.ceil(this.currentCount * 0.5)
          break
        case 'path':
          this.form.baseDir = message.path
          break
        case 'done':
          this.loading = false
          break
        case 'account':
          this.visibleAccount = true
          break
      }
    },
    // 打开本地目录
    openFolder() {
      this.vscode.postMessage({
        command: 'selBaseDir',
        baseDir: this.form.baseDir
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 160px;
  height: 100px;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  border: 1px solid #434557;
}
.item .sel {
  display: none;
}
.item:hover,
.item.select {
  border: 1px solid #3eaf7c;
}
.item.select .sel {
  display: block;
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 20px;
  height: 20px;
}
.m-template .item {
  width: 160px;
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}
.m-template img {
  width: 100%;
  height: 80px;
}
.m-template h4 {
  margin: 6px 0;
}
.m-template p {
  font-size: 12px;
  color: #999;
}
.loading {
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.4);
}
.loading img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  animation: round 1s linear infinite;
}
.loading.hide {
  display: none;
}
@keyframes round {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}

.zl-header {
  color: #fff
}
.zl-header span {
  font-size: 12px;
}
.zl-dir {
  position: relative;
  .point {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
}
.zl-template img {
  width: 16px;
  vertical-align: middle;
}
.zl-template span {
  margin-left: 8px;
  vertical-align: middle;
}
.zl-footer {
  border-top: 1px solid #eee;
}
.zl-container {
  padding: 10px 30px;
}
</style>
