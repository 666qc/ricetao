<template>
  <div class="goods_details">
    <div class="lbt" @click="previewImage">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in lbt" :key="item.src">
          <img :src="item.src" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="waibox">
      <div class="goods_details_introduce">
        <div class="price">
          <span class="discount"
            ><b>$ {{ info.sell_price }}</b></span
          >
          <span class="regular-price">
            现价 $ <del>{{ info.market_price }}</del>
          </span>
        </div>
        <div>{{ info.title }}</div>
      </div>
    </div>

    <div class="card">
      <van-divider content-position="left">介绍</van-divider>
      <div class="content" v-html="info.content"></div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/home/cart')" :badge="$store.getters.getCarTotalNumber"    /><!--   :badge="$store.getters.getCarTotalNumber" -->
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addToCart(true)"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="purchase(false)"
      />
    </van-goods-action>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="Info.id"
      :hide-stock="sku.hide_stock"
      :reset-stepper-on-hide="true"
      :show-add-cart-btn="showAddCartBtn"
      @add-cart="onBuyClicked"
      @buy-clicked="skuBuy"
    >
      <template #sku-messages>
        <div class="card">
          <van-divider>规格</van-divider>
          <div>商品货号：{{ info.goods_no }}</div>
          <div>库存：{{ info.stock_quantity }}件</div>
          <div>上架时间：{{ info.add_time }}</div>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { fetchDetailSwipe, goodsListinfo } from "../api/index.js";
import { ImagePreview, Toast } from "vant";
export default {
  props: ["id"],
  data() {
    return {
      show: false,
      lbt: [], //轮播图
      info: {}, // 商品信息
      // sku
      sku: {
        tree: [],
        price: "0.00", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      showAddCartBtn: true,
      messageConfig: {
        // 数据结构见下方文档
      },
      goods: {
        // 数据结构见下方文档
        picture: "", // c产品缩略图
      },
    };
  },
  created() {
    this._goodsListlunbo();

    this._goodsListinfo();
  },
  methods: {
    // 轮播图
    async _goodsListlunbo() {
      let { message } = await fetchDetailSwipe(this.id);
      this.lbt = message;
      this.goods.picture = message[0].src; // 预览图片 放大功能 // 赋值给sku图片
    },
    // 图片预览
    previewImage() {
      let imgs = this.lbt.map((item) => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
    // 商品信息
    async _goodsListinfo() {
      let { message } = await goodsListinfo(this.id);
      this.info = message;
      console.log(this.info);
      this.sku.price = this.info.sell_price;
      this.sku.stock_num = this.info.stock_quantity;
    },

    // sku  事件
    Info() {},

    // 立即购买
    skuBuy() {
      Toast.success("下单成功,再看看别的商品吧");
    },
    // 立即购买
    purchase(bool) {
      this.show = true;
      this.showAddCartBtn = bool;
      console.log("立即购买");
    },
    // 加入购物车
    addToCart(bool) {
      this.show = true;
      this.showAddCartBtn = bool;
    },
    // sku加入购物车
    onBuyClicked(skudata) { //skuAddCart
      // 准备购物车商品数据 分解出来
      let { id, selectedNum } = skudata;
      let { sell_price } = this.info;
      let cartItem = {
        id: this.info.id, 
        number: selectedNum,
        sell_price,
        selected: true,
      };
      // 把数据添加到vuex中
      console.log(cartItem);  
      this.$store.commit("addGoodsCart", cartItem);
      Toast.success("乖乖躺到购物车去吧");
      this.show = false;
      // this.$store.commit("setToken", token);
    },


  },
};
</script>

<style lang="scss" scoped>
.goods_details {
  background-color: rgb(230, 212, 212);
  padding: 10px;
  .lbt {
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 300px;
    .van-swipe {
      .van-swipe-item {
        display: flex;
        justify-content: center;
        img {
          width: 100%;
        }
      }
    }
  }

  .waibox {
    display: flex;
    justify-content: center;
    .goods_details_introduce {
      // margin: auto;
      box-sizing: border-box;
      border-radius: 10px;
      margin: 10px;
      padding: 10px;
      width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      flex-direction: column-reverse;
      .price {
        margin: 8px;
        border-radius: 10px;
        display: flex;
        justify-content: center;

        .discount {
          color: red;
          margin-left: 50px;
        }

        .regular-price {
          color: rgb(214, 205, 205);
          margin-left: 50px;
          font-size: 14px;
        }
      }
    }
  }

  .card {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
    color: red;

    .content {
      color: #666;

      text-align: center;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      padding-bottom: 50px;
      //   overflow: hidden;
      ::v-deep table {
        width: 100%;
      }
      ::v-deep img {
        width: 100%;
      }
    }
    .my-swipe {
      .van-swipe-item {
        .van-swipe-item {
          height: 240px;
          text-align: center;
          img {
            width: 100%;
            // height: 100%;
          }
        }
      }
    }
  }
}
</style>