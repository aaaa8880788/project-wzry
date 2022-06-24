<template>
  <div class="wrapper">
    <div class="top" :class="{ hidden: isHidden }">
      <ul>
        <li v-for="(item, index) in title" :key="index">
          <div>
            <i :style="getImage(index)"> </i>
            <span>{{ item }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="buttom" @click="() => (isHidden = !isHidden)">
      <i></i>
      <span v-html="isHidden ? outtext : text"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailData",
  data() {
    return {
      title: [
        "爆料站",
        "故事站",
        "周边商城",
        "体验服",
        "新人专区",
        "荣耀传承",
        "王者营地",
        "公众号",
        "版本介绍",
        "对局环境",
        "IP共创计划",
        "创意互动营",
      ],
      bgcPositionX: [
        "63.546%",
        "90.393%",
        "36.746%",
        "9.598%",
        "90.633%",
        "36.467%",
        "63.3%",
        "0",
      ],
      bgcPositionY: [
        "15.017%",
        "15.017%",
        "0.8%",
        "15.517%",
        "1.066%",
        "15.287%",
        "0.927%",
        "96.207%",
      ],
      // 展开收起状态
      isHidden: false,
      // 展开状态显示文本
      text: "<span>收起</span>",
      // 收起状态显示文本
      outtext: "<span>展开</span>",
    };
  },
  methods: {
    getImage(i) {
      return {
        backgroundPositionX: this.bgcPositionX[i],
        backgroundPositionY: this.bgcPositionY[i],
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  text-align: center;
  background-color: #fff;
  margin-top: 1.1538rem;
  .top {
    // height: 80px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      padding: 1rem 0;
      i {
        display: block;
        background: url("~@/assets/image/index.png") no-repeat 0 0;
        background-size: 28.8462rem 35rem;
        width: 1.8462rem;
        height: 1.8462rem;
        margin: 0.3846rem auto;
      }
    }
    li:nth-child(9) {
      i {
        background: url("~@/assets/image/version-icon.png") no-repeat -1px 0;
        background-size: 100%;
      }
    }
    li:nth-child(10) {
      i {
        width: 35px;
        background: url("~@/assets/image/djhj.png") no-repeat 0 0;
        background-size: 100%;
      }
    }
    li:nth-child(11) {
      i {
        background: url("~@/assets/image/ipgc.png") no-repeat 0px -3px;
        width: 2.3077rem;
        background-size: 100%;
      }
    }
    li:nth-child(12) {
      i {
        width: 2.3077rem;
        background: url("~@/assets/image/cyhdy.png") no-repeat -1px -3px;
        background-size: 100%;
      }
    }
    li {
      div {
        border-right: 0.0769rem solid rgb(212, 217, 222);
      }
    }
    li:nth-child(4n) {
      div {
        border-right: none;
      }
    }
  }
  .buttom {
    padding: 0.3846rem 0;
    background-color: rgb(249, 249, 249);
    i {
      margin: 0 0.2308rem;
      display: inline-block;
      background: url("~@/assets/image/index.png") no-repeat 38.577% 52.076%;
      background-size: 28.8462rem 35rem;
      width: 0.7692rem;
      height: 0.7692rem;
    }
  }
}
.hidden {
  ul > li:nth-child(n + 5) {
    display: none;
  }
}
</style>