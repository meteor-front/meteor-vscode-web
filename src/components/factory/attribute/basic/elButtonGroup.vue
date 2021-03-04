<template>
  <div v-if="attributeForm" class="container-attribute">
    <el-tabs v-model="attrTab" @tab-click="handleTabClick">
      <el-tab-pane label="样式" name="3">
        <style-item />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
import mixinAttribute from '@/components/factory/attribute/mixinAttribute'
export default {
  name: 'WidgetBasicElButtonGroup',
  mixins: [mixinAttribute],
  data() {
    return {
      attrTab: '3'
    }
  }
}
</script>
