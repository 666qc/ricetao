import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        cartData: [], //初始化购物车的信息
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        // 添加购物车数据商品信息待过去
        // this.$coomit.state 调用
        // 或者使用辅助函数


        // 往添加购物车数据 商品
        addGoodsCart(state, goods) {
            //  state.cartData.unshift(goods)
            let index = state.cartData.findIndex(item => item.id === goods.id)
            console.log(index);
            if (index === -1) {
                state.cartData.push(goods)
            } else {
                state.cartData[index].number += goods.number
            }
        },
        // 删除
        delCartGoods(){
            state.cartData = seate.cartData.filter(item => item.id !== id)
        }

    },
    getters:{
        // // 获取购物车商品的总数量
        getCarTotalNumber(state){
            let totalNumber = 0;
            state.cartData.forEach(item => totalNumber += item.number)
                return totalNumber
           
        }
    },

    plugins: [createPersistedState()]
})