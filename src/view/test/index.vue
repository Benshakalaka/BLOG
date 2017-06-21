<template>
  <div class="test-wrapper transform-center">
    <circle-menu
      :menu="menu"
      :itemDegree="50"
      :totalDegree="180"
      @select="menuClick"
    >
      <div class="circle-menu-btn" slot="center-btn">设置</div>
    </circle-menu>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../../common/common";

  .test-wrapper {
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
  }

  .circle-menu-btn {
    height: 45px;
    width: 45px;
    line-height: 45px;
    text-align: center;

    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
  }
</style>

<script type="text/ecmascript-6">
  import TestCircleMenu from '../../components/CircleMenu.vue'

  export default {
    name: '',
    data () {
      return {
        menu: [
          {text: 'A', id: 'A'},
          {text: 'B', id: 'B'},
          {text: 'C', id: 'C'}
        ]
      }
    },
    methods: {
      menuClick () {
        console.log(arguments)
      }
    },
    components: {
      'circle-menu': TestCircleMenu
    }
  }
</script>
