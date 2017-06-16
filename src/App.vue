<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style type="text/scss" lang="scss">
  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    height: 100%;
    width: 100%;
  }
</style>

<script type="text/ecmascript-6">
  import 'normalize.css'

  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {}
  }
</script>
