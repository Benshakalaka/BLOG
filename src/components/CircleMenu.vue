<template>
  <div class="_component-circle-menu transform-center">
    <ul class="circle-menu-items clear-ul">
      <li class="circle-menu-item"></li>
      <li class="circle-menu-item"></li>
      <!--<li class="circle-menu-item"></li>
      <li class="circle-menu-item"></li>
      <li class="circle-menu-item"></li>-->
    </ul>
    <div class="circle-menu-btn"></div>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../common/common";
  
  // 容器宽高
  $wrapper-width: 26em;
  $wrapper-height: 26em;
  
  // 每个元素宽高
  $item-width: 15em;
  $item-height: 15em;

  // 角度相关
  $item-degree: 28deg;              // 每个元素的度数
  $item-degree-internal: 10deg;     // 每个元素之间的间隔
  $item-degree-total: $item-degree + $item-degree-internal;     // 逻辑上每个元素所占度数
  $item-degree-skew: 90deg - $item-degree;    // 每个元素需要skew的度数

  // 旋转相关
  $item-rotate-start: 0;

  ._component-circle-menu {
    font-size: 12px;
    width: $wrapper-width;
    height: $wrapper-height;
  }

  .circle-menu-items {
    overflow: hidden;

    .circle-menu-item {
      width: $item-width;
      height: $item-height;
      position: absolute;
      left: - ($item-width - $wrapper-width / 2);
      top: - ($item-height - $wrapper-height / 2);

      background-color: #f00;

      transform-origin: 100% 100%;
    }

    .circle-menu-item:nth-child(1) {
      transform: rotate($item-rotate-start) skew($item-degree-skew);
    }
    .circle-menu-item:nth-child(2) {
      transform: rotate($item-rotate-start + $item-degree-total) skew($item-degree-skew);
    }
    /*.circle-menu-item:nth-child(3) {
      transform: rotate($item-rotate-start + $item-degree-total * 2)
    }
    .circle-menu-item:nth-child(4) {
      transform: rotate($item-rotate-start + $item-degree-total * 3)
    }
    .circle-menu-item:nth-child(5) {
      transform: rotate($item-rotate-start + $item-degree-total * 4)
    }*/
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
