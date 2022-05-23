<template>
  <div>
    <h1>购物车</h1>
    <div>
      <div>
        <van-swipe-cell>
          <van-card
            num="2"
            price="1999.00"
            origin-price="2999"
            title="小米"
            desc="小米9999"
            class="goods-card"
            thumb="http://test.w0824.com/xmnote1.png"
          >
            <template #price-top>
              <van-stepper v-model="value" />
            </template>
          </van-card>

          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { goodsCart } from "../api/index";
export default {
  data() {
    return {
      checked: true,
      cart: [],
      value: 1,
      dis:this.$store.getters.getCarGoodsIds
    };
  },
  created() {
    this._goodsCart();
  },
  methods: {
    _goodsCart() {
      let { message } = goodsCart();
      this.cart = message;
      console.log(message);
    },
    onSubmit() {
      console.log(11);
    },
    onClickEditAddress() {
      console.log("修改地址");
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-card {
  margin: 0;
  // background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>