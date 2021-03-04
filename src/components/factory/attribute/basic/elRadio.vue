<template>
  <div v-if="attributeForm" class="container-attribute">
    <el-tabs v-model="attrTab" @tab-click="handleTabClick">
      <el-tab-pane label="属性" name="1">
        <div class="container-attribute-box">
          <div v-for="(subWidget, subWidgetIndex) in attribute.list" v-if="attribute.child && attribute.child.length > 0" :key="subWidgetIndex" class="container-attribute-sub">
            <sub-widget-item v-for="(attr, key) in subWidget.attribute" :key="key" :parent="subWidget" :sub-attribute="attr" :name="key" :title="attr.title" :type="attr.type" :option-type="attr.optionType" :options="widgetOpitons[subWidget.type] ? widgetOpitons[subWidget.type][key] : []" />
          </div>
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
import subWidgetItem from '@/components/factory/attribute/sub/subWidgetItem'
export default {
  name: 'WidgetBasicElRadio',
  components: { subWidgetItem },
  mixins: [mixinAttribute]
}
</script>
