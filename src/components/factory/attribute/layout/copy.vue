<template>
  <div v-if="attributeForm" class="container-attribute">
    <el-tabs v-model="attrTab" @tab-click="handleTabClick">
      <el-tab-pane label="属性" name="1">
        <div class="container-attribute-box">
          <attribute-item v-for="(attr, key) in attributeForm" :key="key" :name="key" :title="attr.title" :type="attr.type" :option-type="attr.optionType" :options="widgetOpitons[attribute.type] ? widgetOpitons[attribute.type][key] : []" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="样式" name="3">
        <style-item />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
import mixinAttribute from '@/components/factory/attribute/mixinAttribute'
export default {
  name: 'WidgetLayoutElHeader',
  mixins: [mixinAttribute]
}
</script>
