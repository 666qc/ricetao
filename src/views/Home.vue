<template>
  <div class="body">
    <!-- 搜索栏 -->
    <van-sticky>
      <div class="navbar">
        <div class="logo">
          <img src="../assets/logo/to.webp" alt="" />
        </div>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          input-align="center"
        />
      </div>
    </van-sticky>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in Carousel" :key="item.url">
        <img :src="item.img" alt="" />
      </van-swipe-item>
    </van-swipe>

    <!-- 宫格 -->
    <van-grid clickable>
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB1OIxTcLc3T1VjSZLeXXbZsVXa-183-144.png?getAvatar=1"
        text="超市"
        to="/productList"
        dot
      />
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB1LvIxVAvoK1RjSZFDXXXY3pXa-183-144.png?getAvatar=1"
        text="今日爆品"
        to="/details"
        dot
      />
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB19uWKXkCy2eVjSZPfXXbdgpXa-183-144.png?getAvatar=1"
        text="同物国际"
      />
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB1DaMyVpzqK1RjSZFoXXbfcXXa-185-144.png?getAvatar=1"
        text="没饿"
      />

      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB1llI3f4n1gK0jSZKPXXXvUXXa-183-144.png?getAvatar=1"
        text="充值"
      />
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB19dcwVyrpK1RjSZFhXXXSdXXa-183-144.png?getAvatar=1"
        text="吃货"
        
      />
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB19yZJVBLoK1RjSZFuXXXn0XXa-183-144.png?getAvatar=1"
        text="金币庄园"
      />
      <van-grid-item
        icon="https://gw.alicdn.com/tfs/TB16ZYDk4n1gK0jSZKPXXXvUXXa-183-144.png?getAvatar=1"
        text="拍卖"
      />
    </van-grid>

    <van-divider>推荐商品</van-divider>

    <!-- 商品列表 -->
    <Goodslist
      v-for="item in goods"
      :key="item.id"
      :data="item"
      @click="handle"
    >
    </Goodslist>
  </div>
</template>

<script>
import Goodslist from "../componcnts/Goodslist.vue";

import { feachCarousel, feachgoods } from "../api/index.js";

export default {
  components: {
    Goodslist,
  },
  data() {
    return {
      value: "",
      Carousel: [], // 轮播图
      goods: [], // 商品列表
    };
  },
  created() {
    this._feachCarousel(); // 轮播图
    this._feachgoods(); // 商品列表
  },
  methods: {
    handle(data, event) {
      console.log(data.id,"详情id");
      this.$router.push("/details/" + data.id);
    },
    // 轮播图
    async _feachCarousel() {
      let { message } = await feachCarousel();
      this.Carousel = message;
    },
    // 首页商品
    async _feachgoods() {
      let { message } = await feachgoods();
      this.goods = message;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  margin-bottom: 40px;
  .navbar {
    display: flex;
    justify-content: space-between;
    img {
      width: 50px;
      vertical-align: middle;
    }
    .van-search {
      padding: 0px 0px;
      flex: 1;
      background: #fff;
    }
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    img {
      width: 100%;
    }
  }
  .van-grid {
    background-color: #fff;
  }
  .goods_slit {
    display: flex;
    width: 500px;
  }
}
</style>