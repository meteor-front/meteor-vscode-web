<template>
  <el-aside width="200px">
    <div class="panel-search">
      <el-input v-model="widgetName" size="mini" placeholder="请输入组件名称" @change="searchWidget" />
    </div>
    <div class="widget-list">
      <div v-if="page.currentTag === 'vue'" class="widget-list-box">
        <div v-for="(config, key) in widgetConfigList" :key="key" class="widget-item">
          <div class="widget-cat">
            {{ key }}
          </div>
          <ul>
            <draggable
              v-for="(widget, index) in config"
              v-if="widget.show !== 'hidden'"
              :key="index"
              element="li"
              :list="config"
              :options="{group:{ name:'widget', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              class="form-edit-widget-label"
              :move="moveWidget"
              @start="dragStart(widget)"
            >
              <a class="widget-demo">
                <icon class="icon" :name="widget.description.thumbnail" />
                <span>{{ widget.description.name }}</span>
              </a>
            </draggable>
          </ul>
        </div>
      </div>
      <div class="widget-list-box">
        <div class="widget-item">
          <div class="widget-cat">
            页面组件
          </div>
          <ul>
            <draggable
              v-for="(widget, index) in widgetList"
              :key="index"
              element="li"
              :list="widgetList"
              :options="{group:{ name:'widget', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
              class="form-edit-widget-item"
              :move="moveWidget"
              @start="dragStart(widget)"
            >
              <a class="widget-page" :style="'background: url(' + widget.description.avatar + ') center center / contain no-repeat'" @mouseenter="previewWidget(widget)" @mouseleave="closePreviewWidget(widget)">
                <el-button v-if="widget.userId" type="primary" icon="el-icon-delete" circle size="mini" @click="deleteComponent(widget)" />
                <span>{{ widget.description.name }}</span>
              </a>
            </draggable>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="previewImg" class="zl-preview-img">
      <img :src="previewImg">
    </div>
  </el-aside>
</template>
<script type="text/javascript">
import Draggable from 'vuedraggable'
import { cloneDeep } from 'lodash'
import request from '@/util/request'
export default {
  components: {
    Draggable
  },
  props: {
    tagList: {
      type: Object,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      widgetName: '',
      widgetConfigList: [],
      widgetList: [],
      widgetListBack: [],
      previewImg: ''
    }
  },
  inject: ['page'],
  watch: {
    'page.currentTag'(val) {
      this.getWidgetList()
    }
  },
  created() {
    this.widgetConfigList = cloneDeep(this.widgetConfig)
    this.getWidgetList()
    this.$bus.$on('refreshWidget', this.getWidgetList)
  },
  methods: {
    // 关闭预览
    closePreviewWidget() {
      this.previewImg = ''
    },
    // 预览组件
    previewWidget(widget) {
      this.previewImg = widget.description.avatar
    },
    // 删除组件
    deleteComponent(widget) {
      this.$confirm('确定删除该组件', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.get('deleteComponent?id=' + widget.id).then((res) => {
          if (res.code === 0) {
            this.getWidgetList()
          }
        }).catch((err) => {
          console.error(err)
        })
      })
    },
    // 获取组件列表
    getWidgetList() {
      request.get('widget?tag=' + this.page.currentTag + '&type=0').then((res) => {
        this.widgetList = res.data
        this.widgetListBack = cloneDeep(res.data)
      }).catch((err) => {
        console.error(err)
      })
    },
    // 移动组件
    moveWidget(e) {
      // console.log('move', e)
      return true
    },
    // 搜索组件
    searchWidget() {
      const cw = {}
      const wc = cloneDeep(this.widgetConfig)
      for (const key in wc) {
        const widgets = wc[key]
        widgets.forEach(widget => {
          if (widget.description.name.includes(this.widgetName)) {
            if (cw[key]) {
              cw[key].push(widget)
            } else {
              cw[key] = [widget]
            }
          }
        })
      }
      this.widgetConfigList = cw
      let wp = cloneDeep(this.widgetListBack)
      wp = wp.filter((item) => {
        return item.description.name.includes(this.widgetName)
      })
      this.widgetList = wp
    },
    setChildList(widget) {
      if (widget.child && widget.child.length > 0) {
        widget.list = cloneDeep(widget.child)
      } else {
        widget.list = []
      }
      widget.list.forEach(widgetSub => {
        if (widgetSub.child && widgetSub.child.length > 0) {
          this.setChildList(widgetSub)
        }
      })
    },
    dragStart(widget) {
      const widgetClone = cloneDeep(widget)
      this.setChildList(widgetClone)
      this.$store.commit('setWidgetConfig', widgetClone)
    }
  }
}
</script>
<style scoped>
.widget-page {
  position: relative;
  height: 80px;
}
.widget-page .el-button {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.8;
  z-index: 9;
}
.widget-page:hover .el-button {
  display: block;
}
.widget-page span {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 20px;
  color: #fff;
  padding-left: 8px;
  display: block;
  word-wrap:normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.zl-preview-img {
  position: fixed;
  left: 300px;
  top: 40px;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 5px 8px #ccc;
}
.zl-preview-img img {
  max-width: 400px;
}
</style>
