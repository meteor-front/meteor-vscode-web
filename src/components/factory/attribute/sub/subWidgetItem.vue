<template>
  <div class="container-attribute-item">
    <h4 class="title">
      <span class="flex-1">{{ title }}</span>
      <div>
        <el-radio v-if="type === ''" v-model="subAttribute.type" label="0">常量</el-radio>
        <el-radio v-if="type === ''" v-model="subAttribute.type" label="1">变量</el-radio>
        <el-checkbox v-if="subAttribute.required !== undefined" v-model="subAttribute.required" />
      </div>
    </h4>
    <div class="content">
      <el-input v-if="subAttribute.type === '0' && optionType === 'input'" v-model="parent.attribute[name].value" size="mini" />
      <el-select v-if="subAttribute.type === '0' && optionType === 'select'" v-model="parent.attribute[name].value" filterable size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-row v-if="subAttribute.type === '1'" :gutter="10">
        <el-col :span="12">
          <h4 class="var-title">变量名称</h4>
          <el-input v-model="subAttribute.name" size="mini" placeholder="变量名称" @blur="parent.blur(name)" />
        </el-col>
        <el-col :span="12">
          <h4 class="var-title">变量值</h4>
          <el-input v-model="parent.globalData.data[parent.attribute[name].name]" size="mini" placeholder="变量值" @change="parent.changeGlobal" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
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
    },
    subAttribute: {
      type: Object,
      default: function() {
        return {}
      }
    },
    parent: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
