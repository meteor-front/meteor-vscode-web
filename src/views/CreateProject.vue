<template>
  <div class="page">
    <div class="m-header flex">
      <div class="flex-1">
        <h4>创建新工程</h4>
        <p>中铝视拓创建新工程指引，快速创建各端应用工程</p>
      </div>
      <div class="flex-setting">
        <!-- <img src="${uriImgSetting}"> -->
        <span>设置</span>
      </div>
    </div>
    <div class="m-form">
      <div class="m-project flex">
        <div class="flex-name">项目目录：</div>
        <div class="flex-1">
          <input v-model="baseDir" type="text" readonly placeholder="请输入工程目录">
          <img id="selBaseDir" class="file" src="@/assets/images/file.png" alt="" @click="openFolder">
        </div>
      </div>
      <div class="m-git flex">
        <div class="flex-name">工程名称：</div>
        <div class="flex-1">
          <input id="projectName" v-model="projectName" type="text" placeholder="请输入工程名称">
        </div>
      </div>
    </div>
    <div class="m-form form-next">
      <div class="m-project flex">
        <div class="flex-name">模板地址：</div>
        <div class="flex-1">
          <input id="url" v-model="url" type="text" placeholder="可手动输入也可选择下面模板">
        </div>
      </div>
      <div class="m-git flex">
        <div class="flex-name">仓库地址：</div>
        <div class="flex-1">
          <input id="hub" v-model="hub" type="text" placeholder="请输入仓库地址">
        </div>
      </div>
    </div>
    <div class="m-title">选择模板：</div>
    <div class="m-module">
      <div v-for="(template, templateId) in templateObj" :key="templateId" class="item item-type" :class="{'select' : template.selected}" @click="selectTemplateType(template)">
        <img class="sel" :src="selImg">
        <h4>
          <img :src="template.icon">
          <span>{{ template.name }}</span>
        </h4>
        <p>{{ template.description }}</p>
      </div>
    </div>
    <div class="m-template">
      <div v-for="template in templateList" :key="template.id" class="item item-template" :class="{'select': template.id === templateIndex}" @click="selectTemplate(template)">
        <img class="sel" :src="selImg">
        <img :src="template.thumbnail">
        <h4>{{ template.name }}</h4>
        <p>{{ template.description }}</p>
      </div>
    </div>
    <div class="btn" @click="createProject">确定</div>
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
</template>

<script>
// @ is an alias to /src
import utils from '@/util/utils'
export default {
  name: 'Home',
  data() {
    return {
      vscode: null,
      baseDir: '',
      currentCount: '',
      // '0'->pc '1'-> mobile
      templateObj: [{
        id: 0,
        icon: utils.imgs.vue,
        name: 'PC Web',
        description: '创建web端使用工程',
        selected: true,
        list: [{
          id: 0,
          selected: false,
          git: 'http://git.cs2025.com/front/zlst-ele-templete.git',
          name: 'zlst-ele-template',
          description: '基于vue、element-ui的基础工程',
          thumbnail: utils.imgs.pcweb
        }]
      }, {
        id: 1,
        icon: utils.imgs.react,
        name: 'APP',
        description: '快速创建APP',
        selected: true,
        list: [{
          id: 0,
          selected: false,
          git: 'http://git.cs2025.com/fengli/RNBaseApp.git',
          name: 'RNBaseApp',
          description: 'react-native基础工程',
          thumbnail: 'https://www.80fight.cn/vsce/rnb.png'
        }]
      }, {
        id: 2,
        icon: utils.imgs.vue,
        name: 'MiniApp',
        description: '小程序模板',
        selected: true,
        list: [{
          id: 0,
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
      }
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
      id: 0
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
            baseDir: this.baseDir,
            account: this.formAccount
          })
        } else {
          return false
        }
      })
    },
    // 创建新工程
    createProject() {
      if (!this.baseDir) {
        return this.$message({
          message: '请选择项目存放目录！',
          type: 'warning'
        })
      }
      if (!this.projectName) {
        return this.$message({
          message: '请输入工程名！',
          type: 'warning'
        })
      }
      this.loading = true
      this.vscode.postMessage({
        command: 'create',
        url: this.url,
        hub: this.hub,
        projectName: this.projectName,
        baseDir: this.baseDir
      })
    },
    // 选择模板
    selectTemplate(template) {
      this.templateIndex = template.id
      this.setUrl()
    },
    // 选择模板类型
    selectTemplateType(template) {
      this.templateObj.forEach(templateItem => {
        if (template.id === templateItem.id) {
          templateItem.selected = true
          this.templateList = templateItem.list
        } else {
          templateItem.selected = false
        }
      })
      this.templateTypeIndex = template.id
      this.templateIndex = 0
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
          this.baseDir = message.path
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
        baseDir: this.baseDir
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
  min-width: 0;
}
.m-header h4 {
  font-size: 18px;
  margin: 10px 0;
}
.m-header p {
  margin: 0;
  font-size: 12px;
}
.page {
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 30px 40px;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;
  text-align: left;
}
.m-header .flex-setting {
  cursor: pointer;
}
.m-header .flex-setting span {
  vertical-align: middle;
}
.m-header .flex-setting img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.m-module {
  padding: 0 0 10px 0;
  border-right: 1px solid #434557;
  position: absolute;
  left: 40px;
  top: 240px;
  bottom: 60px;
  width: 180px;
  padding-right: 10px;
}
.m-module .item {
  display: block;
  height: 100px;
  margin-bottom: 10px;
}
.m-module .item img {
  width: 24px;
  vertical-align: middle;
}
.m-module .item h4 img {
  width: 20px;
  vertical-align: middle;
  margin-right: 10px;
}
.m-module .item p {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
}
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
  border: 1px solid #0093ff;
}
.item.select .sel {
  display: block;
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 20px;
  height: 20px;
}
.m-template {
  position: absolute;
  right: 40px;
  top: 240px;
  left: 240px;
  bottom: 60px;
  overflow: auto;
  text-align: left;
}
.m-template .item {
  width: 160px;
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}
.m-template img {
  width: 100%;
}
.m-template h4 {
  margin: 6px 0;
}
.m-template p {
  font-size: 12px;
  color: #999;
}
.btn {
  position: absolute;
  right: 40px;
  bottom: 30px;
  line-height: 28px;
  background-color: #434557;
  border-radius: 4px;
  text-align: center;
  width: 60px;
  font-size: 12px;
  cursor: pointer;
}
.m-form {
  display: flex;
}
.m-project {
  position: relative;
  margin: 20px 0;
  align-items: center;
}
.m-project input,
.m-project input:focus,
.m-project input:active,
.m-project input:hover {
  border-radius: 4px;
  padding: 8px 30px 8px 8px;
  background-color: #333;
  border: 1px solid #333;
  box-shadow: none;
  outline: none;
  color: #fff;
  width: 300px;
}
.m-git {
  margin: 20px;
  align-items: center;
}
.m-git input,
.m-git input:focus,
.m-git input:active,
.m-git input:hover {
  border-radius: 4px;
  padding: 8px;
  background-color: #333;
  border: 1px solid #333;
  box-shadow: none;
  outline: none;
  color: #fff;
  width: 300px;
}
.m-form.form-next .m-project {
  margin: 0;
}
.m-form.form-next .m-git {
  margin: 0 20px;
}
.m-title {
  margin-top: 15px;
}
.m-project .file {
  position: absolute;
  top: 6px;
  right: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-image: url('~@/assets/images/file.png');
}
.loading {
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);
}
.loading img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  animation: round 0.5s linear infinite;
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
</style>
