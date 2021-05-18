/**
 * 路由
 * 注意不要在路由中使用懒加载，在vscode中无法加载资源
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateProject from '../views/CreateProject.vue'
import About from '../views/About.vue'
import Page from '..//views/Page.vue'
import Test from '../Test.vue'
import Jenkins from '../views/config/jenkins.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/createProject',
    name: 'CreateProject',
    component: CreateProject
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/page',
    component: Page
  },
  {
    path: '/jenkins',
    component: Jenkins
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
