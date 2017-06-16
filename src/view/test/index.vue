<template>
  <div class="test-wrapper transform-center">
    <router-view></router-view>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../../common/common";

  .test-wrapper {
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data () {
      return {}
    },
    components: {}
  }
</script>
