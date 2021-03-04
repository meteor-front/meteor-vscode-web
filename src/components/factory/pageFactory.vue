<template>
  <el-container class="zl-page-container">
    <widget-container />
    <page-container :widget-form="widgetForm" :widget-form-select="widgetFormSelect" />
    <page-attribute :attribute="$store.state.widgetAttribute" />
    <el-dialog
      title=""
      :visible.sync="visibleJson"
      width="600px"
    >
      <div style="max-height: 400px; overflow: auto;">
        <pre>
{{ previewJsonContent }}
        </pre>
      </div>
      <div slot="footer">
        <el-button @click="visibleJson = false">取 消</el-button>
        <el-button type="primary" @click="visibleJson = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-drawer
      title="样式"
      size="500px"
      :visible.sync="drawerStyle"
      direction="rtl"
      :before-close="closePageStyle"
    >
      <div id="editorStyle" class="panel-editor-style" />
    </el-drawer>
    <!-- 页面生成设置 -->
    <el-dialog
      title="生成页面配置"
      :visible.sync="visiblePageSetting"
      width="400px"
    >
      <el-form ref="formPage" :model="formPage" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="formPage.name" />
        </el-form-item>
        <el-form-item label="页面路径">
          <el-input v-model="formPage.rootPathPage" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="visiblePageSetting = false">取 消</el-button>
        <el-button type="primary" @click="generatePageCode">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import PageAttribute from './pageAttribute.js'
// import CusDialog from '../CusDialog'
// import GenerateForm from '../GenerateForm'
// import JSONEditor from 'jsoneditor'
// import 'jsoneditor/dist/jsoneditor.min.css'
import Clipboard from 'clipboard'
import { basicComponents, layoutComponents, advanceComponents } from '../componentsConfig.js'
// import { loadJs } from '../../util/index.js'
// import request from '../../util/request.js'
import widgetContainer from '@/components/factory/widgetContainer'
import pageContainer from '@/components/factory/pageContainer'
import beautify from 'js-beautify/js/lib/beautify'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import postcss from 'postcss'
import generateFactory from './code/generate.js'
import template from '@/components/factory/code/template/template'
export default {
  name: 'PageFactory',
  components: {
    PageAttribute,
    widgetContainer,
    pageContainer
  },
  props: {
    config: {
      type: Object,
      default: function() {
        return {}
      }
    },
    tagList: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      widgetForm: {
        list: []
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      visibleJson: false,
      previewJsonContent: '',
      drawerStyle: false,
      editorStyle: {},
      visiblePageSetting: false,
      formPage: {
        name: '',
        rootPathPage: ''
      }
    }
  },
  // watch: {
  //   widgetForm: {
  //     deep: true,
  //     handler: function() {
  //       console.log(this.$refs.widgetForm)
  //     }
  //   }
  // },
  watch: {
    '$store.state.widgetSelected': (val, old) => {
      // 选中元素时，改变右侧属性内容
    }
  },
  created() {
    this.$bus.$on('generateCode', this.showPageSetting)
    this.$bus.$on('previewJson', this.previewJson)
    this.$bus.$on('generatePageStyle', this.generatePageStyle)
  },
  mounted() {
    // loadCss('https://unpkg.com/jsoneditor/dist/jsoneditor.min.css')
    // loadJs('https://unpkg.com/jsoneditor/dist/jsoneditor.min.js')
    // loadJs('lib/ace/src/ace.js')
    // this.generatePageCode()
  },
  inject: ['page'],
  methods: {
    // 关闭页面样式
    closePageStyle() {
      // 解析样式，获取类名
      const style = this.editorStyle.getValue()
      const nodes = postcss.parse(style).nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.selector[0] === '.') {
          this.$store.commit('setStyle', node.selector.substr(1, node.selector.length))
        } else {
          this.$store.commit('setStyle', node.selector)
        }
      }
      const pageLink = document.getElementById('pageLink')
      if (pageLink) {
        pageLink.innerHTML = style
      } else {
        const styleNode = document.createElement('style')
        styleNode.id = 'pageLink'
        styleNode.innerHTML = style
        document.head.append(styleNode)
      }
      this.drawerStyle = false
    },
    // 生成页面样式
    generatePageStyle() {
      this.drawerStyle = true
      this.$nextTick(() => {
        this.editorStyle = monaco.editor.create(document.getElementById('editorStyle'), {
          value: '',
          language: 'css',
          minimap: {
            enabled: false
          }
        })
      })
    },
    previewJson() {
      this.previewJsonContent = beautify.js_beautify(JSON.stringify(this.widgetForm.list), { indent_size: 2, space_in_empty_paren: true })
      this.visibleJson = true
    },
    handleGoGithub() {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect(value) {
      this.configTab = value
    },
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    handleMoveStart({ oldIndex }) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove() {
      return true
    },
    handlePreview() {
      this.previewVisible = true
    },
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(() => {})
        this.$refs.widgetPreview.end()
      }).catch(() => {
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson() {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        const editor = ace.edit('jsoneditor')
        editor.session.setMode('ace/mode/json')

        new Clipboard('#copybtn')
      })
    },
    showPageSetting() {
      this.formPage.rootPathPage = this.config.rootPathPage
      this.visiblePageSetting = true
    },
    generatePageCode() {
      if (!this.formPage.name) {
        return this.$message({
          message: '请输入页面名称',
          type: 'warning'
        })
      }
      generateFactory.initImported()
      generateFactory.initComponents()
      let templateCode = template[this.page.currentTag]
      templateCode = templateCode.replace(/\$html\$/gi, generateFactory.generateCode(this.widgetForm))
      templateCode = templateCode.replace(/\$import\$/gi, generateFactory.generateImport(this.widgetForm))
      const components = generateFactory.getComponents()
      components.push({
        code: templateCode,
        name: this.formPage.name,
        position: this.config.rootPathPage
      })
      this.visiblePageSetting = false
      this.$emit('generate', components)
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/cover.scss';
@import '../../styles/index.scss';

.widget-empty{
  background: url('../../assets/form_empty.png') no-repeat;
  background-position: 50%;
}
.zl-page-container {
  height: 100%;
  width: 100%;
}
.panel-editor-style {
  height: 100%;
}
</style>
