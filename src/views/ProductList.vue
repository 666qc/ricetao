<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <Goodslist
          v-for="item in list"
          :key="item.id"
          :title="item"
          :data="item"
        ></Goodslist>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { fetchGoodsList } from "../api/index.js";
import Goodslist from "../componcnts/Goodslist.vue";
import { Toast } from "vant";
export default {
  components: {
    Goodslist,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      pagesize: 8,
    };
  },
  methods: {
    async _fetchGoodsList() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      let { message } = await fetchGoodsList(this.page, this.pagesize);
      this.list = [...this.list, ...message];
      this.loading = false;

      // 加载
      if (message.length == 0) {
        this.finished = true;
      }
      console.log(message);
    },
    // 加载
    onLoad() {
      this.page++;

      this._fetchGoodsList();
    },
    // 下拉刷新
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>