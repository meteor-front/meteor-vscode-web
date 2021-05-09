<template>
  <div class="zl-page" @mouseover="overPage">
    <div class="zl-header">
      <img class="zl-logo" src="~@/assets/images/logo.png">
      <img class="zl-logo-mini" src="~@/assets/images/logo-mini.png">
      <div class="zl-tabs">
        <el-tabs v-model="tabActive" class="zl-pc" @tab-click="tabSwitch">
          <el-tab-pane name="1" label="页面" />
          <el-tab-pane name="2" label="组件" />
          <el-tab-pane v-if="$store.state.processor === '1'" name="3" label="申请" />
          <el-tab-pane v-if="$store.state.processor === '1'" name="4" label="公共" />
        </el-tabs>
        <el-select v-model="tabActive" class="zl-tab-select zl-app" placeholder="请选择类型" size="mini">
          <el-option
            v-for="item in optionsTab"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-dropdown class="zl-app mr10" @command="openUploadDialog">
          <el-button type="text">
            上传 <i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">上传页面</el-dropdown-item>
            <el-dropdown-item command="0">上传组件</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
        <span v-if="user" class="zl-user" @click="showLoginDialog">{{ user.name }}</span>
        <el-button v-else type="text" icon="el-icon-user" @click="showLoginDialog">登录</el-button>
      </div>
    </div>
    <div class="zl-container">
      <page-list v-if="tagList.length > 0 && tabActive === '1'" ref="tab1" :config="formConfig" :tag-list="tagList" @pageModify="pageModify" @preview="preview" @collection="collection" @add="add" @applyCommon="applyCommon" />
      <component-list v-if="tagList.length > 0 && tabActive === '2'" ref="tab2" :config="formConfig" :tag-list="tagList" @componentModify="componentModify" @preview="preview" @collection="collection" @add="add" @applyCommon="applyCommon" />
      <apply-list v-if="tagList.length > 0 && tabActive === '3'" ref="tab3" :config="formConfig" :tag-list="tagList" @pageModify="pageModify" @componentModify="componentModify" @preview="preview" @applyCommon="applyCommon" />
      <common-list v-if="tagList.length > 0 && tabActive === '4'" ref="tab4" :config="formConfig" :tag-list="tagList" @pageModify="pageModify" @componentModify="componentModify" @preview="preview" @applyCommon="applyCommon" />
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
      :before-close="beforeCloseUpload"
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
        </el-form-item>
        <!-- 代码块 -->
        <el-form-item v-if="uploadType === '0'" label="">
          <el-tabs v-model="blockActiveTab" type="card" editable @edit="blockTabEdit" @tab-click="carouselBlockTab">
            <el-tab-pane v-for="(blockTab) in blockTabList" :key="blockTab.label" :label="blockTab.label" :name="blockTab.name">
              <div :id="blockTab.name" :ref="blockTab.name" class="zl-monaco" />
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <!-- 文件级别 -->
        <div class="component-list-box">
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
              <div :id="component.id" :ref="component.id" class="zl-monaco" />
            </el-form-item>
          </div>
          <el-form-item label="">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addComponentItem">添加文件</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-table
              v-if="funcList.length > 0"
              :data="funcList"
              style="width: 100%"
              size="mini"
            >
              <el-table-column
                type="index"
                label="索引"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="name"
                label="名称"
              />
              <el-table-column
                header-align="center"
                align="center"
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="funcEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="mini" @click="funcDel(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item v-if="uploadType === '0'" label="">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFunctionItem">添加功能块</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button size="mini" @click="beforeCloseUpload">取 消</el-button>
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
      class="m-preview-dialog"
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
    <!-- 功能块弹窗 -->
    <el-dialog
      title="功能块"
      :visible.sync="funcVisible"
      width="600px"
    >
      <el-form ref="funcForm" :model="funcForm" label-width="80px" size="mini">
        <el-form-item label="功能名称">
          <el-input v-model="funcForm.name" placeholder="通过 [slot-功能名称] 在组件内引入" />
        </el-form-item>
        <!-- 代码块 -->
        <el-form-item label="">
          <el-tabs v-model="funcBlockActiveTab" type="card" editable size="mini" @edit="funcBlockTabEdit" @tab-click="funcCarouselBlockTab">
            <el-tab-pane v-for="(blockTab) in funcBlockTabList" :key="blockTab.label" :label="blockTab.label" :name="blockTab.name">
              <div :id="blockTab.name + 'Func'" :ref="blockTab.name + 'Func'" class="zl-monaco" />
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <!-- 文件 -->
        <div class="component-list-box">
          <div v-for="component in funcUploadComponentList" :key="component.id" class="component-list">
            <el-button type="danger" circle icon="el-icon-delete" size="mini" class="delete" @click="funcDeleteComponentItem(component)" />
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="文件名">
                  <el-input v-model="component.name" placeholder="index.vue" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="文件内容">
              <div :id="component.id" :ref="component.id" class="zl-monaco" />
            </el-form-item>
          </div>
          <el-form-item label="">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="funcAddComponentItem">添加文件</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="funcVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFunc">确 定</el-button>
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
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
// import eruda from 'eruda'
import applyList from './../components/applyList/applyList.vue'
import commonList from './../components/commonList/commonList.vue'
import { cloneDeep } from 'lodash'
export default {
  components: {
    pageList,
    componentList,
    applyList,
    commonList
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
      blockPosition: '',
      uploading: false,
      optionsTab: [],
      editor: {},
      funcList: [],
      funcVisible: false,
      funcForm: {},
      funcBlockActiveTab: '',
      funcBlockTabList: [],
      positionType: '',
      funcUploadComponentList: []
    }
  },
  created() {
    this.tabActive = this.$route && this.$route.query && this.$route.query.tab || '2'
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
    // 功能块删除
    funcDel(func) {
      this.$confirm('确定删除该功能块?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.funcList = this.funcList.filter((item) => {
          return item.id !== func.id
        })
      }).catch(() => {
      })
    },
    // 功能块编辑
    funcEdit(func) {
      console.log('func', func)
      this.funcForm = func
      this.funcBlockTabList = func.funcBlockTabList
      this.funcUploadComponentList = func.funcUploadComponentList
      this.funcBlockActiveTab = this.funcBlockTabList[0].label
      this.funcVisible = true
      this.$nextTick(() => {
        this.renderMonaco(this.funcBlockActiveTab + 'Func', this.funcBlockTabList[0].code, 'func')
        for (let i = 0; i < this.funcUploadComponentList.length; i++) {
          const uploadComponent = this.funcUploadComponentList[i]
          this.renderMonaco(uploadComponent.id, uploadComponent.code, 'funcFile')
        }
      })
    },
    // 添加功能项
    addFunc() {
      for (let i = 0; i < this.funcUploadComponentList.length; i++) {
        const uploadComponent = this.funcUploadComponentList[i]
        if (this.editor[uploadComponent.id]) {
          uploadComponent.code = this.editor[uploadComponent.id].getValue()
        }
      }
      this.funcForm.funcBlockTabList = this.funcBlockTabList
      this.funcForm.funcUploadComponentList = this.funcUploadComponentList
      const funcList = []
      let has = false
      for (let i = 0; i < this.funcList.length; i++) {
        const func = this.funcList[i]
        if (func.id === this.funcForm.id) {
          funcList.push(this.funcForm)
          has = true
        } else {
          funcList.push(func)
        }
      }
      if (!has) {
        funcList.push(this.funcForm)
      }
      this.funcList = funcList
      this.funcVisible = false
    },
    funcAddComponentItem() {
      const files = []
      const len = this.funcUploadComponentList
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
        const id = uuid()
        this.funcUploadComponentList.push({
          id,
          name: fileName,
          code: '',
          position: '',
          type: this.uploadType === '0' ? 'funcFile' : 'page'
        })
        this.renderMonaco(id)
      })
    },
    funcDeleteComponentItem(component) {
      this.funcUploadComponentList = this.funcUploadComponentList.filter((item) => {
        return item.id !== component.id
      })
    },
    // 功能块切换tab
    funcCarouselBlockTab() {
      this.$nextTick(() => {
        let has = false
        for (let i = 0; i < this.funcBlockTabList.length; i++) {
          const blockTab = this.funcBlockTabList[i]
          if (blockTab.name === this.funcBlockActiveTab) {
            has = true
            this.renderMonaco(this.funcBlockActiveTab + 'Func', blockTab.code || '', 'func')
          }
        }
        if (!has) {
          this.renderMonaco(this.funcBlockActiveTab + 'Func', '', 'func')
        }
      })
    },
    // 功能块切换
    funcBlockTabEdit(name, action) {
      if (action === 'add') {
        this.blockPositionList = this.blockTagConstant[this.formUpload.category]
        this.positionType = 'func'
        this.blockPositionVisible = true
      } else if (action === 'remove') {
        this.funcBlockTabList = this.funcBlockTabList.filter((item) => {
          return item.name !== name
        })
      }
    },
    // 申请成为公共
    applyCommon(page) {
      request.post('/applyCommon', page).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: '申请成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    carouselBlockTab() {
      this.$nextTick(() => {
        let has = false
        for (let i = 0; i < this.blockTabList.length; i++) {
          const blockTab = this.blockTabList[i]
          if (blockTab.name === this.blockActiveTab) {
            has = true
            this.renderMonaco(this.blockActiveTab, blockTab.code || '', 'block')
          }
        }
        if (!has) {
          this.renderMonaco(this.blockActiveTab, '', 'block')
        }
      })
    },
    // 改变组件类型
    changeComponentType() {
      if (!this.formUpload.block) {
        this.$nextTick(() => {
          for (let i = 0; i < this.uploadComponentList.length; i++) {
            const uploadComponent = this.uploadComponentList[i]
            this.renderMonaco(uploadComponent.id)
          }
        })
      }
    },
    beforeCloseUpload() {
      this.visibleUpload = false
      this.uploading = false
    },
    overPage() {
      if (!this.uploading) {
        this.vscode && this.vscode.postMessage({
          command: 'inPage',
          config: {
          }
        })
      }
    },
    // 添加组件到页面
    add(page) {
      this.vscode && this.vscode.postMessage({
        command: 'addPage',
        config: {
          page: page
        }
      })
    },
    // 收藏
    collection(page) {
      request.post('/collection', {
        componentId: page.id,
        userId: this.user.token,
        status: page.collection === '1' ? '0' : '1'
      }).then((res) => {
        this.$message({
          message: page.collection === '1' ? '取消收藏！' : '收藏成功！',
          type: 'success'
        })
        this.$bus.$emit('refreshWidget')
      }).catch((err) => {
        console.error(err)
      })
    },
    changeCategory() {
      if (this.formUpload.block === 1) {
        this.setBlockTabList('component')
      }
    },
    blockPositionConf() {
      // 判断是否已添加
      let blockList = []
      if (this.positionType === 'func') {
        blockList = this.funcBlockTabList
      } else if (this.positionType === 'component') {
        blockList = this.blockTabList
      }
      let has = false
      blockList.forEach(blockTab => {
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
        blockList = blockList.concat({
          label: this.blockPosition,
          name: this.blockPosition,
          code: ''
        })
        if (this.positionType === 'func') {
          this.funcBlockTabList = blockList
        } else if (this.positionType === 'component') {
          this.blockTabList = blockList
        }
        this.blockPositionVisible = false
      }
    },
    // 代码块tab切换
    blockTabEdit(name, action) {
      if (action === 'add') {
        this.blockPositionList = this.blockTagConstant[this.formUpload.category]
        this.positionType = 'component'
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
        // this.$message({
        //   message: '暂无预览效果图，请上传',
        //   type: 'warning'
        // })
      }
    },
    pageModify(page) {
      this.uploading = true
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
      for (let i = 0; i < uploadComponentList.length; i++) {
        const uploadComponent = uploadComponentList[i]
        this.renderMonaco(uploadComponent.id, uploadComponent.code)
      }
    },
    renderMonaco(id, code, type) {
      this.$nextTick(() => {
        const dom = document.getElementById(id)
        if (dom) {
          if (this.editor[id]) {
            // 已有
            this.editor[id].setValue(code || '')
          } else {
            this.editor[id] = monaco.editor.create(document.getElementById(id), {
              value: code || '',
              language: 'plaintext',
              minimap: {
                enabled: false
              }
            })
            this.editor[id].onDidChangeModelContent((e) => {
              switch (type) {
                case 'block':
                  for (let i = 0; i < this.blockTabList.length; i++) {
                    const blockTab = this.blockTabList[i]
                    if (blockTab.name === id) {
                      blockTab.code = this.editor[id].getValue()
                    }
                  }
                  break
                case 'func':
                  for (let i = 0; i < this.funcBlockTabList.length; i++) {
                    const blockTab = this.funcBlockTabList[i]
                    if (blockTab.name + 'Func' === id) {
                      blockTab.code = this.editor[id].getValue()
                    }
                  }
                  break

                default:
                  break
              }
            })
          }
        }
      })
    },
    componentModify(page) {
      this.uploading = true
      this.uploadType = '0'
      this.uploadTypeName = '组件'
      // 销毁编辑器
      for (const key in this.editor) {
        const editorItem = this.editor[key]
        editorItem.dispose()
      }
      this.editor = {}
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
      const funcNames = []
      const funcList = []
      const uploadComponentList = []
      for (let i = 0; i < page.code.length; i++) {
        const codeItem = page.code[i]
        if (codeItem.position) {
          // 功能块
          let index = funcNames.indexOf(codeItem.position)
          if (index === -1) {
            funcNames.push(codeItem.position)
            funcList.push({
              id: uuid(),
              name: codeItem.position,
              funcBlockTabList: [],
              funcUploadComponentList: []
            })
            index = funcList.length - 1
          }
          switch (codeItem.type) {
            case 'func':
              codeItem.code && (funcList[index].funcBlockTabList = JSON.parse(codeItem.code))
              break
            case 'funcFile':
              funcList[index].funcUploadComponentList.push({
                id: uuid(),
                ...codeItem
              })
              break
            default:
              break
          }
        } else if (codeItem.name) {
          // 文件
          uploadComponentList.push({
            id: uuid(),
            name: codeItem.name,
            type: codeItem.type,
            code: codeItem.code
          })
        } else {
          // 代码块
          this.blockTabList = JSON.parse(codeItem.code)
          this.blockActiveTab = this.blockTabList[0].name
        }
      }
      this.visibleUpload = true
      this.renderMonaco(this.blockActiveTab, this.blockTabList[0].code || '', 'block')
      this.uploadComponentList = uploadComponentList
      this.funcList = funcList
      this.visibleUpload = true
      this.$nextTick(() => {
        for (let i = 0; i < this.uploadComponentList.length; i++) {
          const uploadComponent = this.uploadComponentList[i]
          this.renderMonaco(uploadComponent.id, uploadComponent.code || '')
        }
      })
    },
    tabSwitch(tab) {
    },
    mock() {
      this.user = { 'token': 20, 'name': 'jiaolong', 'avatar': null, 'password': '123' }
      this.getUserInfo()
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
              this.getUserInfo()
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
      this.uploading = false
      if (!this.formUpload.name) {
        return this.$message({
          message: `请填写${this.uploadTypeName}名称`,
          type: 'warning'
        })
      }
      let code = []
      // 代码块
      let hasCont = false
      for (let i = 0; i < this.blockTabList.length; i++) {
        const blockTab = this.blockTabList[i]
        if (blockTab.code) {
          hasCont = true
        }
      }
      if (hasCont) {
        code.push({
          id: uuid(),
          name: '',
          type: 'component',
          code: JSON.stringify(this.blockTabList)
        })
      }
      // 文件
      for (let i = 0; i < this.uploadComponentList.length; i++) {
        const uploadComponent = this.uploadComponentList[i]
        if (this.editor[uploadComponent.id]) {
          uploadComponent.code = this.editor[uploadComponent.id].getValue()
        }
      }
      code = code.concat(cloneDeep(this.uploadComponentList))
      // 功能块
      for (let i = 0; i < this.funcList.length; i++) {
        const func = this.funcList[i]
        let hasFuncCont = false
        for (let i = 0; i < func.funcBlockTabList.length; i++) {
          const blockTab = func.funcBlockTabList[i]
          if (blockTab.code) {
            hasFuncCont = true
          }
        }
        if (hasFuncCont) {
          code.push({
            id: uuid(),
            name: '',
            type: 'func',
            code: JSON.stringify(func.funcBlockTabList),
            position: func.name
          })
        }
        const funcUploadComponentList = cloneDeep(func.funcUploadComponentList)
        funcUploadComponentList.forEach(componentItem => {
          componentItem.position = func.name
          code.push(componentItem)
        })
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
    // 添加功能项
    addFunctionItem() {
      const func = {
        id: uuid(),
        name: '',
        funcBlockTabList: [],
        funcUploadComponentList: []
      }
      this.funcForm = func
      this.setBlockTabList('func')
      this.funcVisible = true
      this.$nextTick(() => {
        this.renderMonaco(this.funcBlockActiveTab + 'Func', '', 'func')
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
        const id = uuid()
        this.uploadComponentList.push({
          id,
          name: fileName,
          code: '',
          position: '',
          type: this.uploadType === '0' ? 'component' : 'page'
        })
        this.renderMonaco(id)
      })
    },
    // 打开上传弹框
    openUploadDialog(uploadType) {
      for (const key in this.editor) {
        const editorItem = this.editor[key]
        editorItem.dispose()
      }
      this.editor = {}
      this.uploading = true
      this.uploadType = uploadType
      this.uploadTypeName = uploadType === '0' ? '组件' : '页面'
      this.uploadComponentList = []
      this.fileList = []
      if (this.uploadType === '1') {
        this.addComponentItem()
      }
      this.formUpload = {
        id: '',
        name: '',
        category: 'vue',
        avatar: '',
        block: uploadType === '0' ? 1 : 0
      }
      this.setBlockTabList('component')
      this.funcList = []
      this.visibleUpload = true
      if (uploadType === '0') {
        this.$nextTick(() => {
          this.renderMonaco(this.blockActiveTab, '', 'block')
        })
      }
    },
    // 初始化代码块tab
    setBlockTabList(type) {
      let tabList = []
      let active = ''
      switch (this.formUpload.category) {
        case 'vue':
          tabList = [{
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
          active = 'template'
          break
        case 'miniapp':
          tabList = [{
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
          active = 'js'
          break
        case 'react':
          tabList = [{
            label: 'js',
            name: 'js',
            code: ''
          }]
          active = 'js'
          break

        default:
          break
      }

      switch (type) {
        case 'component':
          this.blockTabList = tabList
          this.blockActiveTab = active
          break
        case 'func':
          this.funcBlockTabList = tabList
          this.funcBlockActiveTab = active
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
            this.getUserInfo()
          } else {
            this.visibleLogin = true
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
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取用户信息
    getUserInfo() {
      request.token = this.user.token
      request.get('/user').then((res) => {
        if (res.code === 0) {
          this.$store.commit('setProcessor', res.user.processor)
          if (res.user.processor === '1') {
            this.optionsTab = [{
              label: '页面',
              value: '1'
            }, {
              label: '组件',
              value: '2'
            }, {
              label: '申请',
              value: '3'
            }, {
              label: '公用',
              value: '4'
            }]
          } else {
            this.optionsTab = [{
              label: '页面',
              value: '1'
            }, {
              label: '组件',
              value: '2'
            }]
          }
          this.getTagList()
        }
      }).catch((err) => {
        console.error(err)
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
        this.$store.commit('setToken', this.user.token + '')
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
  background-color: #efefef;
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
  font-weight: bold;
}
.zl-tabs {
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
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
.zl-app {
  display: none;
}
.mr10 {
  margin-right: 10px;
}
.zl-pc {
  display: block;
}
@media screen and (max-width: 550px) {
  .zl-pc {
    display: none;
  }
  .zl-app {
    display: inline-block;
    /deep/ {
      .el-input--mini .el-input__inner,
      .el-input.is-focus .el-input__inner {
        background-color: transparent;
        border-color: transparent;
        color: #fff;
        font-weight: bold;
      }
      .el-input .el-select__caret {
        color: #fff;
      }
      .el-button {
        color: #fff;
        font-size: 12px;
      }
    }
  }
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
  .m-preview-dialog.el-dialog__wrapper /deep/ {
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
.zl-tab-select {
  width: 70px;
  margin: 6px 10px 0 0;
}
.zl-monaco {
  height: 180px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
