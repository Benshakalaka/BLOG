<template>
  <div class="_component-circle-menu transform-center" ref="circleMenuWrapper">
    <ul class="circle-menu-items clear-ul" ref="circleMenuContainer">
      <li class="circle-menu-item" v-for="item in menu"></li>
    </ul>
    <div class="transform-center" @click="activeMenu">
      <slot name="center-btn"></slot>
    </div>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../common/common";
  
  // 容器宽高
  $wrapper-width: 12em;
  $wrapper-height: 12em;
  
  // 每个元素宽高
  $item-width: 8em;
  $item-height: 8em;

  // 中心按钮宽高
  $btn-width: 5em;
  $btn-height: 5em;

  // 旋转相关
  $item-rotate-start: 0;

  ._component-circle-menu {
    // font-size: 12px;
  }

  .circle-menu-items {
    width: $wrapper-width;
    height: $wrapper-height;
    position: relative;

    overflow: hidden;
    border-radius: 50%;

    transform: scale(0);
    transition: transform .5s ease .5s;

    .circle-menu-item {
      width: $item-width;
      height: $item-height;
      position: absolute;
      left: - ($item-width - $wrapper-width / 2);
      top: - ($item-height - $wrapper-height / 2);

      background-color: #f00;

      transform-origin: 100% 100%;
      transition: transform .5s ease;
    }

    &.active {
      transition: transform .5s ease;
      transform: scale(1);

      .circle-menu-item {
        transition: transform .5s ease .5s;
      }
    }
  }

</style>

<script type="text/ecmascript-6">

  const toString = Object.prototype.toString

  export default {
    name: '',
    data () {
      return {
        // 每个菜单元素之间的间隔度数
        _intervalDegree: 0,     // 每个元素的度数
        _itemDegree: 0,         // 每个元素之间的间隔
        _totalDegree: 0,        // 总度数
        _skewDegree: 0          // 每个元素需要skew的度数
      }
    },
    props: {
      // 组件使用em作为单位, 改变font-size可以改变组件大小, 默认12px
      fontSize: {
        type: String,
        default: '12px'
      },
      // 菜单内容   :   [{ text: '', id: '', degree}]
      // text为显示的内容
      // id为唯一标识
      // degree表示为此菜单选项单独设置角度
      menu: {
        type: Array,
        required: true
      },
      // 起始度数
      startDegree: {
        type: Number,
        default: 0
      },
      // 每个菜单选项的度数
      itemDegree: {
        type: Number,
        required: true
      },
      // 所有菜单选项的总度数
      totalDegree: {
        type: Number,
        required: true
      }
    },
    methods: {
      // 初始化
      initProps () {
        Array.from(arguments).forEach(func => {
          toString.call(func) === '[object Function]' && func()
        })
      },
      // 改变容器的fontSize从而改变以em为单位的元素的长宽
      changeFontSize () {
        this.$refs.circleMenuWrapper.style.fontSize = this.fontSize
      },
      // 度数校验
      degreeCheck () {
        const len = this.menu.length
        // 移除单位
        let itemDegree = this.itemDegree
        let totalDegree = Math.min(this.totalDegree, 360)
        let intervalDegree = 0

        if (itemDegree * len > totalDegree) {
          itemDegree = parseInt(totalDegree / len)
        }

        const totalIntervalDegree = totalDegree - len * itemDegree
        if (totalDegree === 360) {
          intervalDegree = parseInt(totalIntervalDegree / len)
        } else {
          intervalDegree = parseInt(totalIntervalDegree / (len - 1))
        }

        const ret = {
          _itemDegree: itemDegree,
          _totalDegree: totalDegree,
          _intervalDegree: intervalDegree,
          _skewDegree: (90 - itemDegree)
        }

        Object.keys(ret).forEach(key => {
          this[key] = ret[key]
        })
      },
      // 激活菜单
      activeMenu () {
        let classes = this.$refs.circleMenuContainer.classList
        if (classes.contains('active')) {
          classes.remove('active')
          Array.from(this.$refs.circleMenuContainer.querySelectorAll('.circle-menu-item')).forEach((item, index) => {
            item.style.transform = `rotate(${this.startDegree}deg) skew(${this._skewDegree}deg)`
          })
        } else {
          classes.add('active')
          Array.from(this.$refs.circleMenuContainer.querySelectorAll('.circle-menu-item')).forEach((item, index) => {
            item.style.transform = `rotate(${this.startDegree + (this._itemDegree + this._intervalDegree) * index}deg) skew(${this._skewDegree}deg)`
          })
        }
      }
    },
    mounted () {
      this.initProps(
        this.degreeCheck,
        this.changeFontSize
      )

      // 初始化菜单
      Array.from(this.$refs.circleMenuContainer.querySelectorAll('.circle-menu-item')).forEach((item) => {
        item.style.transform = `rotate(${this.startDegree}deg) skew(${this._skewDegree}deg)`
      })
    }
  }
</script>
