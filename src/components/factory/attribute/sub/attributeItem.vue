<template>
  <div class="container-attribute-item">
    <h4 class="title">
      <span class="flex-1">{{ title }}</span>
      <div>
        <el-radio v-if="type === ''" v-model="parent.attributeForm[name].type" label="0" @change="parent.switchType(name, $event)">常量</el-radio>
        <el-radio v-if="type === ''" v-model="parent.attributeForm[name].type" label="1" @change="parent.switchType(name, $event)">变量</el-radio>
        <el-checkbox v-if="parent.attributeForm[name].required !== undefined" v-model="parent.attributeForm[name].required" @change="parent.change" />
      </div>
    </h4>
    <div class="content">
      <el-input v-if="parent.attributeForm[name].type === '0' && (optionType === 'input' || optionType === 'number')" v-model="attributeValue" size="mini" @change="changeInput" />
      <div v-if="parent.attributeForm[name].type === '0' && (optionType === 'array' || optionType === 'object')" class="container-attribute-editor">
        <div :id="id" />
      </div>
      <el-select v-if="parent.attributeForm[name].type === '0' && optionType === 'select'" v-model="parent.attribute.attribute[name].value" filterable size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-row v-if="parent.attributeForm[name].type === '1'" :gutter="10">
        <el-col :span="12">
          <h4 class="var-title">变量名称</h4>
          <el-input v-model="parent.attributeForm[name].name" size="mini" placeholder="变量名称" @blur="parent.blur(name)" />
        </el-col>
        <el-col :span="12">
          <h4 class="var-title">变量值</h4>
          <el-input v-model="variable" size="mini" placeholder="变量值" @change="changeVariable" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { v4 as uuid } from 'uuid'
import beautify from 'js-beautify/js/lib/beautify'
export default {
  name: 'AttributeItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    optionType: {
      type: String,
      default: 'input'
    }
  },
  data() {
    return {
      id: '',
      variable: '',
      variableType: 'string',
      attributeValue: null,
      editor: null
    }
  },
  inject: ['parent'],
  created() {
    this.id = uuid()
    const variable = this.parent.globalData.data[this.parent.attribute.attribute[this.name].name]
    if (Array.isArray(variable)) {
      this.variableType = 'array'
      this.variable = JSON.stringify(variable) || ''
    } else if (typeof variable === 'object') {
      this.variableType = 'object'
      this.variable = JSON.stringify(variable) || ''
    } else {
      this.variable = variable
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (document.getElementById(this.id)) {
        this.editor = monaco.editor.create(document.getElementById(this.id), {
          value: '',
          language: 'css',
          minimap: {
            enabled: false
          },
          renderValidationDecorations: 'off',
          LineNumbersType: 'off'
        })
        this.editor.onDidBlurEditorText(this.blurText)
        if (this.optionType === 'object' || this.optionType === 'array') {
          this.attributeValue = JSON.stringify(this.parent.attribute.attribute[this.name].value)
          this.editor.setValue(beautify.js_beautify(this.attributeValue, { indent_size: 2, space_in_empty_paren: true }))
        } else {
          this.attributeValue = this.parent.attribute.attribute[this.name].value
        }
      }
      if (!(this.optionType === 'object' || this.optionType === 'array')) {
        this.attributeValue = this.parent.attribute.attribute[this.name].value
      }
    })
  },
  methods: {
    blurText() {
      this.attributeValue = this.editor.getValue()
      this.changeInput()
    },
    changeVariable(e) {
      if (this.variableType === 'object' || this.variableType === 'array') {
        this.parent.globalData.data[this.parent.attribute.attribute[this.name].name] = JSON.parse(e)
      } else {
        this.parent.globalData.data[this.parent.attribute.attribute[this.name].name] = e
      }
      this.parent.changeGlobal(JSON.parse(e))
    },
    changeInput(e) {
      if (this.optionType === 'number') {
        this.parent.attribute.attribute[this.name].value = parseFloat(this.attributeValue)
      } else if (this.optionType === 'array' || this.optionType === 'object') {
        this.parent.attribute.attribute[this.name].value = JSON.parse(this.attributeValue)
      } else {
        this.parent.attribute.attribute[this.name].value = this.attributeValue
      }
    }
  }
}
</script>
