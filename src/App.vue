<template>
    <div class="app">
        <!-- navbar -->
       <van-nav-bar
            :title="title"
            left-text="返回"
            right-text="按钮"
            v-show="isShowNavbar"
            @click-left="$router.back()"
            left-arrow
        />
     
        <router-view></router-view>
       
    </div>
</template>

<script>
    export default {
        name:"App",
        data(){
            return {
                isShowNavbar: false,
                title:"乐淘！"
            }
        },
        watch:{
            '$route':{
                handler:function(newRoute,oldRoute){
                    console.log(newRoute);

                    let { isMainPage,title } = newRoute.meta 
                    this.title = title;
                    this.isMainPage = isMainPage ? false :true
                    if(isMainPage){
                        this.isShowNavbar = false
                    }else {
                        this.isShowNavbar = true
                    }
                },
                
                immediate: true // 立即执行
            }

        }
       
    }
</script>
<style lang="scss">
    .app {
        min-width: 320px;
        max-width: 750px;
        margin: 0 auto;
    }
</style>

