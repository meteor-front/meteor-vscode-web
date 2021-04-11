<template>
  <div class="zl-page">
    <div class="zl-header">
      <img class="zl-logo" src="~@/assets/images/logo.png">
      <img class="zl-logo-mini" src="~@/assets/images/logo-mini.png">
      <div class="zl-tabs">
        <el-tabs v-model="tabActive" @tab-click="tabSwitch">
          <el-tab-pane name="1" label="页面" />
          <el-tab-pane name="2" label="组件" />
        </el-tabs>
      </div>
      <!-- <div class="zl-tag-list">
        <el-button v-for="tag in tagList" :key="tag.id" :type="tag.own ? 'success' : 'danger'" size="mini" round @click="selectTag(tag)">{{ tag.name }}</el-button>
      </div> -->
      <div class="zl-right">
        <!-- <el-button type="text" size="medium" icon="el-icon-document" @click="previewJson">json查看 </el-button> -->
        <el-button v-if="user" type="text" size="medium" icon="el-icon-upload" @click="openUploadDialog('1')">上传页面</el-button>
        <el-button v-if="user" type="text" size="medium" icon="el-icon-upload" @click="openUploadDialog('0')">上传组件</el-button>
        <!-- <el-button v-if="user" type="text" size="medium" icon="el-icon-document" @click="generateCode">生成代码</el-button> -->
        <!-- <el-button type="text" size="medium" icon="el-icon-document" @click="generatePageStyle">样式</el-button> -->
        <!-- <el-button v-if="user" type="text" icon="el-icon-setting" @click="visibleConfig = true">配置信息</el-button> -->
        <span v-if="user" class="zl-user" @click="showLoginDialog">欢迎您，{{ user.name }}</span>
        <el-button v-else type="text" icon="el-icon-user" @click="showLoginDialog">登录</el-button>
      </div>
    </div>
    <div class="zl-container">
      <page-list v-if="tagList.length > 0 && tabActive === '1'" ref="tab1" :config="formConfig" :tag-list="tagList" @pageModify="pageModify" @preview="preview" @collection="collection" />
      <component-list v-if="tagList.length > 0 && tabActive === '2'" ref="tab2" :config="formConfig" :tag-list="tagList" @componentModify="componentModify" @preview="preview" @collection="collection" />
      <!-- <page-factory v-if="tagList.length > 0 && tabActive === '2'" ref="pageFactory" :config="formConfig" :tag-list="tagList" @generate="generate" /> -->
    </div>
    <!-- 配置信息弹框 -->
    <el-dialog
      title=""
      :visible.sync="visibleConfig"
      width="400px"
    >
      <el-form ref="formConfig" :model="formConfig" label-width="80px">
        <el-form-item label="页面路径">
          <el-input v-model="formConfig.rootPathPage" />
        </el-form-item>
        <el-form-item label="组件路径">
          <el-input v-model="formConfig.rootPathComponent" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visibleConfig = false">取 消</el-button>
        <el-button type="primary" @click="modifyConfig">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传组件 -->
    <el-dialog
      :title="(formUpload.id ? '编辑' : '添加') + uploadTypeName"
      :visible.sync="visibleUpload"
      width="680px"
    >
      <el-form ref="formUpload" :model="formUpload" label-width="80px" size="mini">
        <el-form-item :label="uploadTypeName + '名称'">
          <el-input v-model="formUpload.name" placeholder="crudShop" />
        </el-form-item>
        <el-form-item :label="uploadTypeName + '图标'">
          <el-upload
            :action="baseUrl + '/upload'"
            multiple
            :limit="1"
            :file-list="fileList"
            :on-success="uploadSuccess"
          >
            <el-button size="mini" type="primary">点击上传</el-button>
            <span slot="tip">&nbsp;只能上传jpg/png文件，且不超过500kb</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="formUpload.category" placeholder="分类" @change="changeCategory">
            <el-option v-for="tag in tagList" :key="tag.name" :label="tag.name" :value="tag.name" />
          </el-select>
          <el-select v-if="uploadType === '0'" v-model="formUpload.block" class="ml10" placeholder="请选择组件类型">
            <el-option
              v-for="item in componentLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 文件级别 -->
        <div v-if="!formUpload.block" class="component-list-box">
          <div v-for="component in uploadComponentList" :key="component.id" class="component-list">
            <el-button type="danger" circle icon="el-icon-delete" size="mini" class="delete" @click="deleteComponentItem(component)" />
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="文件名">
                  <el-input v-model="component.name" placeholder="index.vue" />
                </el-form-item>
              </el-col>
              <el-col v-if="uploadType === '1'" :span="8">
                <el-form-item label="文件类型">
                  <el-select v-model="component.type" placeholder="文件类型">
                    <el-option
                      v-for="item in pageTypeList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="文件内容">
              <el-input v-model="component.code" type="textarea" rows="6" />
            </el-form-item>
          </div>
          <el-form-item label="">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addComponentItem">添加文件项</el-button>
          </el-form-item>
        </div>
        <!-- 代码块 -->
        <el-form-item v-if="formUpload.block" label="">
          <el-tabs v-model="blockActiveTab" type="card" editable @edit="blockTabEdit">
            <el-tab-pane v-for="(blockTab) in blockTabList" :key="blockTab.label" :label="blockTab.label" :name="blockTab.name">
              <el-input v-model="blockTab.code" type="textarea" rows="6" />
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="mini" @click="visibleUpload = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addComponent">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="登录"
      :visible.sync="visibleLogin"
      width="500px"
    >
      <el-form ref="formLogin" :model="formLogin" :rules="ruleLogin" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formLogin.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLogin.password" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visibleLogin = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 预览弹窗 -->
    <el-dialog
      title=""
      :visible.sync="previewVisible"
      width="600"
    >
      <div class="m-preview">
        <img :src="previewUrl">
      </div>
    </el-dialog>
    <!-- 选择块内容 -->
    <el-dialog
      title="位置选择"
      :visible.sync="blockPositionVisible"
      width="400px"
    >
      <el-select v-model="blockPosition" class="zl-block" placeholder="请选择块位置">
        <el-option
          v-for="item in blockPositionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <div slot="footer">
        <el-button @click="blockPositionVisible = false">取 消</el-button>
        <el-button type="primary" @click="blockPositionConf">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import utils from '@/util/utils'
import request from '@/util/request'
import { v4 as uuid } from 'uuid'
import pageList from '@/components/pageList/index'
import componentList from '@/components/componentList/index'
// import eruda from 'eruda'
export default {
  components: {
    pageList,
    componentList
  },
  data() {
    return {
      logoUrl: utils.imgs.logo,
      tagList: [],
      currentTag: '',
      vscode: null,
      config: {},
      visibleConfig: false,
      formConfig: {
        rootPathPage: '',
        rootPathComponent: ''
      },
      visibleUpload: false,
      uploadComponentList: [],
      formUpload: {
        id: '',
        name: '',
        category: 'vue',
        avatar: '',
        block: 1
      },
      fileList: [],
      baseUrl: '',
      visibleLogin: false,
      formLogin: {
        name: '',
        password: ''
      },
      ruleLogin: {
        name: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      },
      user: null,
      uploadType: '0', // 0: 组件 1: 页面
      uploadTypeName: '',
      pageTypeList: [],
      tabActive: '1',
      previewVisible: false,
      previewUrl: '',
      componentLevel: [{
        label: '文件级组件',
        value: 0
      }, {
        label: '代码块组件',
        value: 1
      }],
      blockTabList: [],
      blockActiveTab: '',
      blockCont: '',
      blockTagConstant: {},
      blockPositionVisible: false,
      blockPositionList: [],
      blockPosition: ''
    }
  },
  created() {
    this.tabActive = this.$route && this.$route.query && this.$route.query.tab || '1'
    this.baseUrl = utils.constant.uploadUrl
    if (process.env.NODE_ENV === 'development') {
      this.mock()
    }
    // this.openUploadDialog('0')
  },
  mounted() {
    this.$nextTick(() => {
      // eruda.init()
      // eslint-disable-next-line no-undef
      this.vscode = acquireVsCodeApi()
      window.addEventListener('message', this.messageHandle)
      // 获取配置信息
      this.getVscodeConfig()
    })
  },
  provide() {
    return {
      page: this
    }
  },
  methods: {
    // 收藏
    collection(page) {
      console.log(page.collection)
      request.post('/collection', {
        componentId: page.id,
        userId: this.user.token,
        status: page.collection === '1' ? '0' : '1'
      }).then((res) => {
        console.log(res)
        this.$message({
          message: page.collection === '1' ? '收藏成功！' : '取消收藏！',
          type: 'success'
        })
        this.$bus.$emit('refreshWidget')
      }).catch((err) => {
        console.error(err)
      })
    },
    changeCategory() {
      if (this.formUpload.block === 1) {
        this.setBlockTabList()
      }
    },
    blockPositionConf() {
      // 判断是否已添加
      let has = false
      this.blockTabList.forEach(blockTab => {
        if (blockTab.name === this.blockPosition) {
          has = true
        }
      })
      if (has) {
        this.$message({
          message: '位置已存在',
          type: 'warning'
        })
      } else {
        this.blockTabList = this.blockTabList.concat({
          label: this.blockPosition,
          name: this.blockPosition,
          code: ''
        })
        this.blockPositionVisible = false
      }
    },
    // 代码块tab切换
    blockTabEdit(name, action) {
      if (action === 'add') {
        this.blockPositionList = this.blockTagConstant[this.formUpload.category]
        this.blockPositionVisible = true
      } else if (action === 'remove') {
        this.blockTabList = this.blockTabList.filter((item) => {
          return item.name !== name
        })
      }
    },
    preview(page) {
      this.previewUrl = page.description.avatar
      if (this.previewUrl) {
        this.previewVisible = true
      } else {
        this.$message({
          message: '暂无预览效果图，请上传',
          type: 'warning'
        })
      }
    },
    pageModify(page) {
      this.uploadType = '1'
      this.uploadTypeName = '页面'
      this.formUpload = {
        id: page.id,
        name: page.description.name,
        avatar: page.description.avatar,
        category: page.category,
        block: page.block
      }
      if (page.description && page.description.avatar) {
        this.fileList = [{
          name: page.description.avatar.replace(/.*\/(.*)\.\w*/gi, '$1'),
          url: page.description.avatar
        }]
      }
      const uploadComponentList = []
      page.code.forEach(codeItem => {
        uploadComponentList.push({
          id: uuid(),
          name: codeItem.name,
          type: codeItem.type,
          code: codeItem.code
        })
      })
      this.uploadComponentList = uploadComponentList
      this.visibleUpload = true
    },
    componentModify(page) {
      this.uploadType = '0'
      this.uploadTypeName = '组件'
      this.formUpload = {
        id: page.id,
        name: page.description.name,
        avatar: page.description.avatar,
        category: page.category,
        block: page.block
      }
      if (page.description && page.description.avatar) {
        this.fileList = [{
          name: page.description.avatar.replace(/.*\/(.*)\.\w*/gi, '$1'),
          url: page.description.avatar
        }]
      }
      if (page.block === 0) {
        // 文件组件
        const uploadComponentList = []
        page.code.forEach(codeItem => {
          uploadComponentList.push({
            id: uuid(),
            name: codeItem.name,
            type: codeItem.type,
            code: codeItem.code
          })
        })
        this.uploadComponentList = uploadComponentList
      } else {
        if (page.code[0]) {
          this.blockTabList = JSON.parse(page.code[0].code)
          this.blockActiveTab = this.blockTabList[0].name
        }
      }
      this.visibleUpload = true
    },
    tabSwitch(tab) {
    },
    mock() {
      this.user = { 'token': 20, 'name': 'jiaolong', 'avatar': null, 'password': '123' }
      this.getTagList()
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {
      if (res.code === 0) {
        this.formUpload.avatar = 'http://www.80fight.cn/zlst/' + res.data
      }
    },
    // 登录
    login() {
      this.$refs['formLogin'].validate((valid) => {
        if (valid) {
          request.post('/login', this.formLogin).then((res) => {
            if (res.code === 0) {
              this.vscode && this.vscode.postMessage({
                command: 'modifyPageConfig',
                config: {
                  user: JSON.stringify(res.data)
                }
              })
              this.visibleLogin = false
              this.user = res.data
              this.getTagList()
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    // 显示登录弹框
    showLoginDialog() {
      this.visibleLogin = true
    },
    // 添加组件
    addComponent() {
      if (!this.formUpload.name) {
        return this.$message({
          message: `请填写${this.uploadTypeName}名称`,
          type: 'warning'
        })
      }
      let code = []
      if (this.formUpload.block === 1) {
        // 代码块
        code = [{
          id: uuid(),
          name: '',
          type: 'component',
          code: JSON.stringify(this.blockTabList)
        }]
      } else {
        code = this.uploadComponentList
      }
      request.post('/component', {
        id: this.formUpload.id,
        description: {
          name: this.formUpload.name,
          avatar: this.formUpload.avatar
        },
        category: this.formUpload.category,
        type: this.uploadType,
        block: this.formUpload.block,
        code: code
      }).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: `${this.formUpload.id ? '编辑' : '添加'}${this.uploadTypeName}成功！`,
            type: 'success'
          })
          this.$bus.$emit('refreshWidget')
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
        this.visibleUpload = false
      }).catch((err) => {
        this.$message({
          message: err.message,
          type: 'warning'
        })
        console.error(err)
      })
    },
    // 删除项
    deleteComponentItem(component) {
      this.uploadComponentList = this.uploadComponentList.filter((item) => {
        return item.id !== component.id
      })
    },
    // 添加文件项
    addComponentItem() {
      const files = []
      const len = this.uploadComponentList.length
      const index = len > 0 ? len : ''
      switch (this.formUpload.category) {
        case 'vue':
          files.push('index' + index + '.vue')
          break
        case 'react':
          files.push('index' + index + '.js')
          break
        case 'miniapp':
          if (len > 0) {
            files.push('index' + index + '.js')
          } else {
            files.push('index.js')
            files.push('index.json')
            files.push('index.wxml')
            files.push('index.wxss')
          }
          break

        default:
          break
      }
      files.forEach(fileName => {
        this.uploadComponentList.push({
          id: uuid(),
          name: fileName,
          code: '',
          position: '',
          type: this.uploadType === '0' ? 'component' : 'page'
        })
      })
    },
    // 打开上传弹框
    openUploadDialog(uploadType) {
      this.uploadType = uploadType
      this.uploadTypeName = uploadType === '0' ? '组件' : '页面'
      this.uploadComponentList = []
      this.fileList = []
      this.addComponentItem()
      this.formUpload = {
        id: '',
        name: '',
        category: 'vue',
        avatar: '',
        block: uploadType === '0' ? 1 : 0
      }
      this.setBlockTabList()
      this.visibleUpload = true
    },
    // 初始化代码块tab
    setBlockTabList() {
      switch (this.formUpload.category) {
        case 'vue':
          this.blockTabList = [{
            label: 'template',
            name: 'template',
            code: ''
          }, {
            label: 'data',
            name: 'data',
            code: ''
          }, {
            label: 'methods',
            name: 'methods',
            code: ''
          }, {
            label: 'style',
            name: 'style',
            code: ''
          }]
          this.blockActiveTab = 'template'
          break
        case 'miniapp':
          this.blockTabList = [{
            label: 'js',
            name: 'js',
            code: ''
          }, {
            label: 'wxml',
            name: 'wxml',
            code: ''
          }, {
            label: 'wxss',
            name: 'wxss',
            code: ''
          }, {
            label: 'json',
            name: 'json',
            code: ''
          }]
          this.blockActiveTab = 'js'
          break
        case 'react':
          this.blockTabList = [{
            label: 'js',
            name: 'js',
            code: ''
          }]
          this.blockActiveTab = 'js'
          break

        default:
          break
      }
    },
    // 修改配置信息
    modifyConfig() {
      this.vscode.postMessage({
        command: 'modifyPageConfig',
        config: this.formConfig
      })
    },
    // 获取配置信息
    getVscodeConfig() {
      this.vscode.postMessage({
        command: 'getPageConfig'
      })
    },
    // 来自vscode的信息
    messageHandle(event) {
      const message = event.data
      switch (message.command) {
        case 'backConfig':
          this.config = message.config
          this.formConfig.rootPathComponent = this.config.rootPathComponent
          this.formConfig.rootPathPage = this.config.rootPathPage
          if (this.config.user) {
            this.user = JSON.parse(this.config.user)
            this.getTagList()
          }
          break
        case 'modifyConfigDone':
          this.visibleConfig = false
          break
        default:
          break
      }
    },
    setCurrentTag() {
      this.tagList.forEach(tag => {
        if (tag.own) {
          this.currentTag = tag.name
        }
      })
    },
    // 选择标签
    selectTag(tag) {
      this.tagList = this.tagList.map((tagItem) => {
        tagItem.own = (tagItem.id === tag.id)
        return tagItem
      })
      this.setCurrentTag()
      request.get(`/ownTag?tag=${tag.name}`).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取标签列表
    getTagList() {
      request.token = this.user.token
      request.get('/tagList').then((res) => {
        const frameworkList = []
        const pageTypeList = []
        const blockTagConstant = {}
        res.data.forEach(item => {
          if (item.type === 'framework') {
            frameworkList.push(item)
          }
          if (item.type === 'page') {
            pageTypeList.push(item)
          }
          if (item.type === 'block') {
            if (item.name) {
              const nameArr = item.name.split('.')
              const type = nameArr[0]
              const name = nameArr[1]
              if (blockTagConstant[type]) {
                blockTagConstant[type].push({
                  label: item.description,
                  value: name
                })
              } else {
                blockTagConstant[type] = [{
                  label: item.description,
                  value: name
                }]
              }
            }
          }
        })
        this.tagList = frameworkList
        this.pageTypeList = pageTypeList
        this.blockTagConstant = blockTagConstant
        this.setCurrentTag()
      }).catch((error) => {
        console.log(error)
      })
    },
    // 进入预览模式
    previewJson() {
      this.$bus.$emit('previewJson')
    },
    // 生成json
    generateJson() {
      this.$bus.$emit('generateJson')
    },
    // 生成代码
    generateCode() {
      this.$bus.$emit('generateCode')
    },
    // 获取页面级样式
    generatePageStyle() {
      this.$bus.$emit('generatePageStyle')
    },
    generate(components) {
      this.vscode.postMessage({
        command: 'generatePage',
        components
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.zl-header{
  overflow: hidden;
  height: 40px;
  padding: 0 10px 0 20px;
  background-color: #3eaf7c;
  position: relative;
  text-align: left;

  .zl-logo{
    height: 20px;
    vertical-align: top;
    margin-top: 8px;
  }
  .zl-title{
    display: inline-block;
    line-height: 40px;
    vertical-align: middle;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-left: 6px;
  }
  .zl-right {
    float: right;
    .el-button--text {
      color: #fff;
    }
  }
}
.zl-header /deep/ {
  .el-tabs__item {
    color: #fff;
    padding: 0 20px!important;
  }
  .el-tabs__item.is-active {
    color: #fff;
    background-color: #039252;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__active-bar {
    display: none;
  }
}
.zl-container{
  height: calc(100% - 40px);
}
.zl-tag-list {
  display: inline-block;
  margin-left: 30px;
}
.component-list {
  position: relative;
  margin-bottom: 20px;
  background-color: rgba(78, 176, 124, 0.18);
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 2px;
}
.component-list .delete {
  position: absolute;
  right: -10px;
  top: -10px;
}
.zl-user {
  color: #fff;
  font-size: 14px;
  margin-left: 20px;
}
.zl-tabs {
  display: inline-block;
  vertical-align: top;
  margin-left: 40px;
}
.m-preview {
  text-align: center;
  image {
    max-height: 600px;
    max-width: 100%;
  }
}
.ml10 {
  margin-left: 10px;
}
.zl-block {
  display: block;
}
.zl-logo-mini {
  display: none;
}
@media screen and (max-width: 600px) {
  .zl-header {
    padding: 0 0 0 10px;
    .zl-right {
      display: none;
    }
    .zl-logo {
      display: none;
    }
    .zl-logo-mini {
      display: inline-block;
      margin-top: 4px;
    }
    .zl-tabs {
      margin-left: 0;
      float: right;
    }
  }
  .el-dialog__wrapper /deep/ {
    .el-dialog {
      margin-top: 0!important;
      margin-bottom: 0!important;
      width: 100%;
      height: 100%;
    }
    .el-dialog__body {
      padding: 20px 8px;
      height: calc(100% - 90px);
    }
  }
  .m-preview {
    position: relative;
    overflow: auto;
    height: 100%;
    img {
      margin: auto;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
