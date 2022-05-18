import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Index from "../views/Index.vue"


// 创建路由对象
const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/home/index"
        },
        {
            path: "/home",
            component: Index,
            children: [
                
                {
                    path: 'index',
                    name: 'Home',
                    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
                    meta: {
                        name: "Home",
                        isMainPage: true
                    }
                  },

                {
                    path: 'cart',
                    name: 'Cart',
                    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
                    meta: {
                        name: "cart",
                        isMainPage: true
                    }
                  },

                {
                    path: 'user',
                    name: 'User',
                    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
                    meta: {
                        name: "User",
                        isMainPage: true
                    }
                  }
            ]
        },
        {
            path: '/details',
            name: 'Details',
            component: () => import(/* webpackChunkName: "about" */ '../views/Details.vue'),
            meta: {
                title: "商品详情"
            }

          },
        {
            path: '/order',
            name: 'Order',
            component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue'),
            meta: {
                title: "我的订单"
            }
          },





    ]
})
// 导出
export default router;