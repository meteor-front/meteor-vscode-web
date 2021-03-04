<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  created() {
    // vscode刚渲染时无法打开/目录，做一次跳转
    // rootPath是为了支持vscode不同页面跳转要求，在index.html中定义的变量
    // eslint-disable-next-line no-undef
    if (this.$route.path !== rootPath) {
      this.$router.push({
        // eslint-disable-next-line no-undef
        path: rootPath
      })
    }
  },
  methods: {
  }
}
</script>

<style>
html, body, #app, .zl-page {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
