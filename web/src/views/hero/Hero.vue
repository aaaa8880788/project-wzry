<template>
  <div>
    <!-- 顶部bar部分 -->
    <TarBar>
      <template #left-1>
        <div class="left-1"><img src="@/assets/image/logo.png" /></div>
      </template>
      <template #left-2>
        <div class="left-2">
          <div class="topTitle">王者荣耀</div>
          <div class="bottomTitle">攻略站</div>
        </div>
      </template>
      <template #right>
        <div class="right">
          <router-link to="/">返回首页 &gt;</router-link>
        </div>
      </template>
    </TarBar>
    <!-- 因为tarbar用了定位不占位置，所有要一个占位盒子填上方便部剧 -->
    <div class="useless-box"></div>
    <!-- 英雄主要信息部分 -->
    <div class="page-hero-top" v-if="model">
      <img :src="model.banner" />
      <div class="heroInfo">
        <div>
          <span>{{ model.title }}</span>
        </div>
        <div>
          <h3>{{ model.name }}</h3>
        </div>
        <div>
          <span>{{ model.categories.map((el) => el.name).join("/") }}</span>
        </div>
        <div class="heroInfo-bottom">
          <div class="scores" v-if="model.scores">
            <span>难度</span>
            <span>{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span>{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span>{{ model.scores.attack }}</span>
            <span>生存</span>
            <span>{{ model.scores.survive }}</span>
          </div>
          <router-link to="/" tag="div" class="skin">
            <span>皮肤：3 &gt;</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 英雄技能信息部分 -->
    <div class="page-hero-bottom">
      <!-- 两个标题导航部分 -->
      <div class="hero-title" v-if="titleNav">
        <div
          v-for="(item, index) in titleNav"
          :key="index"
          :class="{ 'title-active': currentActiveTitle === index }"
          @click="titleChange(index)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 轮播图部分 -->
      <swiper v-if="model" ref="vanSwipe" @slide-change="onChange">
        <!-- 第一个轮播图 -->
        <swiper-slide>
          <!-- 技能介绍部分 -->
          <div class="hero-skills">
            <div class="skill-title">
              <a class="skill-title-left" href="javascript:;">
                <i></i>
                <span>英雄介绍视频</span>
              </a>
              <a class="skill-title-right" href="javascript:;">
                <i></i>
                <span>一图识英雄</span>
              </a>
            </div>
            <div class="skill-icon" v-if="model.skills">
              <div
                v-for="(item, index) in model.skills"
                :key="index"
                :class="{ 'skill-active': index === currentActiveSkill }"
                @click="() => (currentActiveSkill = index)"
              >
                <img :src="item.icon" />
              </div>
            </div>
            <div class="skill-decoration" v-if="currentSkill">
              <div class="skill-name">
                <h3>{{ currentSkill.name }}</h3>
                <span
                  >(冷却值：{{ currentSkill.cd }} 消耗：{{
                    currentSkill.cost
                  }})</span
                >
              </div>
              <div class="skill-info">
                <p>{{ currentSkill.descripton }}</p>
              </div>
            </div>
          </div>
          <!-- 加点建议部分 -->
          <div class="hero-advice" v-if="model.skilladvice">
            <m-hero-card>
              <img src="@/assets/image/icon_16.png" alt="" />
              <span>加点建议</span>
              <template #content>
                <div class="addAdvice" v-if="model.skilladvice.skill1">
                  <div class="left" v-if="model.skilladvice.skill1">
                    <span>主升</span>
                    <img :src="model.skilladvice.skill1.icon" alt="" />
                    <span>{{ model.skilladvice.skill1.name }}</span>
                  </div>
                  <div class="center">
                    <span>副升</span>
                    <img :src="model.skilladvice.skill2.icon" alt="" />
                    <span>{{ model.skilladvice.skill2.name }}</span>
                  </div>
                  <div class="right">
                    <span>召唤师技能</span>
                    <img :src="model.skilladvice.superskill1.icon" alt="" />
                    <span>{{ model.skilladvice.superskill1.name }}</span>
                  </div>
                </div>
              </template>
            </m-hero-card>
          </div>
          <!-- 出装推荐部分 -->
          <div class="hero-equipment" v-if="model">
            <m-hero-card>
              <img src="@/assets/image/icon_11.png" alt="" />
              <span>出装推荐</span>
              <template #content>
                <!-- 顺风出装 -->
                <div class="goodEquipment">
                  <span>顺风出装</span>
                  <div class="equipmentTop">
                    <div
                      class="items"
                      v-for="(item, index) in model.items1"
                      :key="index"
                    >
                      <img :src="item.icon" />
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </div>
                <!-- 逆风出装 -->
                <div class="goodEquipment">
                  <span>逆风出装</span>
                  <div class="equipmentBottom">
                    <div
                      class="items"
                      v-for="(item, index) in model.items2"
                      :key="index"
                    >
                      <img :src="item.icon" />
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </m-hero-card>
          </div>
          <!-- 铭文推荐部分部分 -->
          <div class="hero-mingwen" v-if="model">
            <m-hero-card>
              <img src="@/assets/image/icon_12.png" alt="" />
              <span>铭文推荐</span>
              <template #content>
                <div class="mingwenAdd">
                  <div
                    class="mingwenitems"
                    v-for="(item, index) in model.mingwens"
                    :key="index"
                  >
                    <img :src="item.icon" />
                    <span>{{ item.name }}</span>
                    {{ item.descripton }}
                    <span> </span>
                  </div>
                </div>
              </template>
            </m-hero-card>
          </div>
          <!-- 使用技巧部分 -->
          <div class="usage-skill" v-if="model">
            <m-hero-card>
              <img src="@/assets/image/icon_13.png" alt="" />
              <span>使用技巧</span>
              <template #content>
                <div class="usage-content">
                  <p>{{ model.usageTip }}</p>
                </div>
              </template>
            </m-hero-card>
          </div>
          <!-- 对抗技巧部分 -->
          <div class="usage-skill">
            <m-hero-card>
              <img src="@/assets/image/icon_14.png" alt="" />
              <span>对抗技巧</span>
              <template #content>
                <div class="usage-content">
                  <p>{{ model.battleTip }}</p>
                </div>
              </template>
            </m-hero-card>
          </div>
          <!-- 团战思路部分 -->
          <div class="usage-skill">
            <m-hero-card>
              <img src="@/assets/image/icon_15.png" alt="" />
              <span>团队思路</span>
              <template #content>
                <div class="usage-content">
                  <p>{{ model.teamTip }}</p>
                </div>
              </template>
            </m-hero-card>
          </div>
          <!-- 英雄关系部分 -->
          <div class="hero-relation" v-if="model">
            <m-hero-card>
              <img src="@/assets/image/icon_08.png" />
              <span>英雄关系</span>
              <template #content>
                <!-- 最佳搭档 -->
                <div class="hero-partner" v-if="goodPartner">
                  <p>最佳搭档</p>
                  <ul v-for="(item, index) in goodPartner" :key="index">
                    <li>
                      <img :src="item.hero.avatar" />
                      <p>{{ item.descripton }}</p>
                    </li>
                  </ul>
                </div>
                <!-- 被谁克制 -->
                <div class="hero-partner" v-if="killbywho">
                  <p>被谁克制</p>
                  <ul v-for="(item, index) in killbywho" :key="index">
                    <li>
                      <img :src="item.hero.avatar" />
                      <p>{{ item.descripton }}</p>
                    </li>
                  </ul>
                </div>
                <!-- 克制谁 -->
                <div class="hero-partner" v-if="killwho">
                  <p>克制谁</p>
                  <ul v-for="(item, index) in killwho" :key="index">
                    <li>
                      <img :src="item.hero.avatar" />
                      <p>{{ item.descripton }}</p>
                    </li>
                  </ul>
                </div>
              </template>
            </m-hero-card>
          </div>
        </swiper-slide>
        <!-- 第二个轮播图 -->
        <swiper-slide>
          <!-- <div v-html="model.body" class="hero-body"></div> -->
          <vedioList :allVideosData="allVideosData"> </vedioList>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import TarBar from "@/components/TarBar";

// 引入视频列表
import vedioList from "@/components/VedioList";

export default {
  name: "Hero",
  props: {
    id: { required: true },
  },
  components: {
    TarBar,
    vedioList,
  },
  data() {
    return {
      titleNav: ["英雄初识", "进阶攻略"],
      currentActiveTitle: 0,
      currentActiveSkill: 0,
      model: {
        title: "",
        name: "",
        categories: [],
        scores: [],
        skills: [],
        items1: [],
        items2: [],
        mingwens: [],
        skilladvice: {
          skill1: {},
          skill2: {},
          superskill1: {},
        },
      },
      // 英雄关系部分数据
      goodPartner: [],
      killbywho: [],
      killwho: [],
      allVideosData: [],
    };
  },
  methods: {
    async getHeroData() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
      // 获取英雄进阶详情数据
      this.getVedio();
      // console.log(this.model);
      // 对英雄关系数据进行处理
      this.model.partners.filter((el) => {
        if (el.name === "最佳搭档") {
          this.goodPartner.push(el);
        }
        if (el.name === "被谁克制") {
          this.killbywho.push(el);
        }
        if (el.name === "克制谁") {
          this.killwho.push(el);
        }
      });
    },
    // 轮播图滑动时触发
    onChange() {
      this.currentActiveTitle = this.$refs.vanSwipe.swiper.realIndex;
    },
    // 点击标题切换高亮时触发
    titleChange(i) {
      this.$refs.vanSwipe.swiper.slideTo(i);
    },
    async getVedio() {
      const { data } = await this.$http.get(`/vedios/hero/${this.model.name}`);
      this.allVideosData = data;
    },
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentActiveSkill];
    },
  },
  created() {
    this.getHeroData();
  },
};
</script>

<style lang="less" scoped>
// 占位盒子样式
.useless-box {
  height: 3.5rem;
}
// left-1盒子部分
.left-1 {
  img {
    width: 2.4rem;
    height: 2.4rem;
  }
}
// left-2盒子部分
.left-2 {
  display: flex;
  color: white;
  .topTitle {
    margin-right: 0.7692rem;
  }
}
.right {
  a {
    color: white;
  }
}
// 英雄主要信息部分
.page-hero-top {
  font-size: 0.9231rem;
  color: white;
  position: relative;
  img {
    width: 100%;
  }
  .heroInfo {
    div {
      margin-top: 3px;
    }
    z-index: 2;
    padding: 0.7692rem 1.1538rem;
    width: 100%;
    bottom: 0;
    position: absolute;
    .heroInfo-bottom {
      display: flex;
      justify-content: space-between;
    }
  }
  .heroInfo-bottom {
    .scores {
      span:nth-child(2n) {
        padding: 0 0.2308rem;
        margin: 0.7692rem;
        border-radius: 100%;
      }
      span:nth-child(2) {
        background-color: rgb(128, 83, 0);
        border: 0.0769rem solid rgb(128, 83, 0);
      }
      span:nth-child(4) {
        background-color: rgb(31, 54, 149);
        border: 0.0769rem solid rgb(31, 54, 149);
      }
      span:nth-child(6) {
        background-color: rgb(121, 26, 22);
        border: 0.0769rem solid rgb(121, 26, 22);
      }
      span:nth-child(8) {
        background-color: rgb(51, 51, 44);
        border: 0.0769rem solid rgb(51, 51, 44);
      }
    }
    .skin {
      color: #b6afa8;
    }
  }
}
.page-hero-top::after {
  content: "";
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("~@/assets/image/bt.png");
  background-size: contain;
}
// 英雄技能信息部分
.page-hero-bottom {
  // 两个标题导航部分
  .hero-title {
    background-color: #fff;
    padding: 0.7692rem;
    padding-bottom: 0.7692rem;
    text-align: center;
    display: flex;
    justify-content: space-around;
    border-bottom: 0.0769rem solid rgb(212, 217, 222);
    .title-active {
      color: #d59b40;
      border-bottom: 0.0769rem solid #d59b40;
    }
  }
  // 英雄技能部分
  .hero-skills {
    background-color: #fff;
    padding: 0.7692rem;
    .skill-title {
      padding: 0 0.1538rem;
      text-align: center;
      display: flex;
      .skill-title-left {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #343440;
        flex: 1;
        padding: 0.5385rem;
        border: 0.0769rem solid rgb(212, 217, 222);
        margin-right: 0.7692rem;
        border-radius: 0.3846rem;
        i {
          margin-right: 0.7692rem;
          display: block;
          background: url("~@/assets/image/icon_06.png") no-repeat;
          background-size: contain;
          height: 1.5385rem;
          width: 1.5385rem;
        }
      }
      .skill-title-right {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #343440;
        padding: 0.5385rem;
        flex: 1;
        border: 0.0769rem solid rgb(212, 217, 222);
        border-radius: 0.3846rem;
        i {
          margin-right: 0.7692rem;
          display: block;
          background: url("~@/assets/image/icon_07.png") no-repeat;
          background-size: contain;
          height: 1.5385rem;
          width: 1.5385rem;
        }
      }
    }
    .skill-icon {
      margin: 2.3077rem 0;
      display: flex;
      justify-content: space-around;
      div {
        border: 0.2308rem solid #fff;
        img {
          width: 4.6154rem;
        }
      }
      .skill-active {
        border: 0.2308rem solid #d59b40;
        border-radius: 2.3077rem;
      }
    }
    .skill-decoration {
      .skill-name {
        display: flex;
        h3 {
          margin-right: 2.3077rem;
        }
        span {
          color: #7a7a80;
        }
      }
      .skill-info {
        margin: 0.7692rem 0;
        font-size: 0.9231rem;
      }
    }
  }
  // 加点建议部分
  .hero-advice {
    padding: 0.7692rem;
    background-color: #fff;
    margin-top: 1.1538rem;
    .addAdvice {
      display: flex;
      justify-content: space-around;
      img {
        margin: 0.7692rem 0;
        width: 4.6154rem;
        border-radius: 100%;
      }
      .left,
      .center,
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  // 出装推荐部分
  .hero-equipment {
    padding: 0.7692rem;
    background-color: #fff;
    .goodEquipment {
      .equipmentTop,
      .equipmentBottom {
        margin: 0.7692rem 0;
        padding: 0.7692rem 0;
        display: flex;
        justify-content: space-around;
        .items {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            border-radius: 100%;
            margin-bottom: 0.3846rem;
            width: 3.4615rem;
          }
        }
      }
      .equipmentTop {
        border-bottom: 0.1538rem solid rgb(239, 241, 243);
      }
    }
  }
  // 铭文推荐部分
  .hero-mingwen {
    margin-top: 0.7692rem;
    padding: 0.7692rem;
    background-color: #fff;
    .mingwenAdd {
      text-align: center;
      display: flex;
      .mingwenitems {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 3.0769rem;
        }
      }
    }
  }
  // 使用技巧部分
  .usage-skill {
    margin-top: 0.7692rem;
    padding: 0.7692rem;
    background-color: #fff;
    .usage-content {
      font-size: 0.9231rem;
    }
  }
  // 英雄关系部分
  .hero-relation {
    margin-top: 0.7692rem;
    padding: 0.7692rem;
    background-color: #fff;
    .hero-partner {
      border-bottom: 2px solid rgb(231, 234, 237);
      p {
        margin-top: 0.3846rem;
      }
      ul > li {
        display: flex;
        align-items: center;
        margin: 0.7692rem 0;
        img {
          width: 3.8462rem;
          height: 3.8462rem;
          margin-right: 0.7692rem;
        }
      }
    }
  }
}
</style>
<style lang="less" >
/* 第二个轮播图部分样式 */
.hero-body {
  background-color: #fff;
  padding: 1.5385rem 0;
  h1 {
    margin: 1.5385rem 0;
  }
  img {
    margin: 1.5385rem 0;
    height: auto;
    width: 100%;
  }
}
</style>