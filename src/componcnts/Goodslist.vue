<template>
    <div class="item" @click="clickHandle">
        <div class="imgWrap">
          <img v-lazy="data.img_url">
        </div>
       
       <div class="item_details">
            <div class="title">{{data.title}}</div>
        <slot name="footer">
            <div class="price">
                <span>&yen; {{data.sell_price}}</span>
                <span> {{ data.buy }} 购买</span>
            </div>
        </slot>
       </div>

    </div>
</template>

<script>

    export default {
        props:['data'],
           
        methods:{
            clickHandle(event){
                 // 触发父的自定义事件
                this.$emit('click',this.data,event)
            }

        }
    }
</script>

<style lang="scss" scoped>
.item_details{
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
}
     .item {
    margin-bottom: 200px;
    display: flex;
    height: 140px;
    /* width: 47%; */
    padding: 6px;
    /* border-radius: 8px; */
    background: #fff;
    margin-bottom: 4px;
    font-size: 14px;
    justify-content: space-between;
    align-content: space-between;
    flex-direction: row;

      .imgWrap {
        display: flex;
        justify-content: center;
        height: 124px;
        width: 100%;
        img {
          height: 100%;
          width: 100%;
        }
      }

        .title {
            margin: 2px 0;
            width:200px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:nth-child(1) {
          color: #ff845e;
          font-size: 16px;
          font-weight: 700;
        }

        span:nth-child(2) {
          font-size: 12px;
          color: #999;
        }
      }
    }
</style>
