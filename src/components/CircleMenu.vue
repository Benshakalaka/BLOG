<template>
  <div class="_component-circle-menu transform-center" ref="circleMenuWrapper">
    <ul class="circle-menu-items clear-ul" ref="circleMenuContainer">
      <li
        class="circle-menu-item"
        v-for="item in menu"
        @click="clickMenu(item.id)">
        <span> {{ item.text }} </span>
      </li>
    </ul>
    <div class="cm-btn-wrapper transform-center" @click="activeMenu">
      <slot name="center-btn"></slot>
    </div>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../common/common";

  ._component-circle-menu {
    // font-size: 12px;
  }

  .circle-menu-items {
    position: relative;

    overflow: hidden;
    border-radius: 50%;

    transform: scale(0);
    transition: transform .5s ease .5s;

    .circle-menu-item {
      position: absolute;
      background-color: #000;

      transform-origin: 100% 100%;
      transition: transform .5s ease;

      span {
        color: #fff;
      }
    }

    &.active {
      transition: transform .5s ease;
      transform: scale(1);

      .circle-menu-item {
        transition: transform .5s ease .5s;
      }
    }
  }

  .cm-btn-wrapper {
    padding: .3em;
    border-radius: 50%;
    background-color: #fff;
  }

</style>

<script type="text/ecmascript-6">

  const toString = Object.prototype.toString

  export default {
    name: '',
    data () {
      return {
        // 每个菜单元素之间的间隔度数
        realItemDegree: [],         // 每个元素度数
        realTotalDegree: 0,        // 总度数
        menuList: null
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
      },
      // 外层宽高(单位em)
      wrapperLength: {
        type: Number,
        default: 10
      },
      // 内层宽高(单位em)
      innerLength: {
        type: Number,
        default: 7
      },
      // 顺时针(默认)或逆时针
      rotateOrder: {
        type: Boolean,
        default: true
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
        let itemDegree = this.itemDegree
        let totalDegree = this.realTotalDegree = Math.min(this.totalDegree, 360)
        let currTotalDegree = 0
        let currItemDegree = 0

        this.menu.forEach(item => {
          currItemDegree = (item.degree || itemDegree)
          this.realItemDegree.push(currItemDegree)
          currTotalDegree += currItemDegree
        })

        if (currTotalDegree > totalDegree) {
          const length = this.menu.length
          const averageDegree = totalDegree / length
          this.realItemDegree = Array.from({length}).map(() => averageDegree)
        }
      },
      // 根据菜单所在位置获取旋转角度
      getRotateDegree (index) {
        let currTotalDegree = 0
        while (index--) { currTotalDegree += (this.realItemDegree[index] + this.intervalDegree) }
        return this.rotateOrder ? (this.startDegree + currTotalDegree) : (-this.startDegree - currTotalDegree)
      },
      // 根据菜单所在位置获取倾斜角度
      getSkewDegree (index) {
        return (90 - this.realItemDegree[index])
      },
      // 处理每一个菜单
      handleEachMenu (callback) {
        this.menuList.forEach((item, index, array) => {
          callback && callback({
            item,
            index,
            array
          })
        })
      },
      // 激活菜单
      activeMenu () {
        let classes = this.$refs.circleMenuContainer.classList
        let callback = null

        if (classes.contains('active')) {
          classes.remove('active')
          let rotateDegree = this.getRotateDegree(0)
          let skewDegree = this.getSkewDegree(0)
          callback = ({item}) => {
            item.style.transform = `rotate(${rotateDegree}deg) skew(${skewDegree}deg)`
          }
        } else {
          classes.add('active')
          callback = ({item, index}) => {
            let rotateDegree = this.getRotateDegree(index)
            let skewDegree = this.getSkewDegree(index)
            item.style.transform = `rotate(${rotateDegree}deg) skew(${skewDegree}deg)`
          }
        }

        this.handleEachMenu(callback)
      },
      clickMenu (id) {
        this.$emit('select', id)
      }
    },
    computed: {
      intervalDegree () {          // 每个元素的间隔度数
        const len = this.menu.length
        const totalIntervalDegree = this.realTotalDegree - this.realItemDegree.reduce((sum, item) => {
          return sum + item
        }, 0)
        let intervalDegree = 0

        if (this.realTotalDegree === 360) {
          intervalDegree = parseInt(totalIntervalDegree / len)
        } else {
          intervalDegree = parseInt(totalIntervalDegree / (len - 1))
        }

        return intervalDegree
      },
      itemPosition () {
        return -(this.innerLength - this.wrapperLength / 2)
      }
    },
    mounted () {
      this.menuList = Array.from(this.$refs.circleMenuContainer.querySelectorAll('.circle-menu-item'))

      this.initProps(
        this.degreeCheck,
        this.changeFontSize
      )

      // 宽高设置
      this.$refs.circleMenuContainer.style.height = this.$refs.circleMenuContainer.style.width = `${this.wrapperLength}em`

      // 初始化菜单
      let rotateDegree = this.getRotateDegree(0)
      let skewDegree = this.getSkewDegree(0)
      this.handleEachMenu(({item, index}) => {
        const style = item.style
        style.transform = `rotate(${rotateDegree}deg) skew(${skewDegree}deg)`
        style.height = style.width = `${this.innerLength}em`
        style.top = style.left = `${this.itemPosition}em`
      })
    }
  }
</script>
