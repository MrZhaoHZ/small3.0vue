<template>
    <div>
        <ul class="tabbar">
            <li class="tablist" v-for="(item, index) in tab" :key="index + '_tab'" @click="tabChange(item, index)">
                <img :src="item.imgurlchoose" v-if="index == isSelect && item.imgurlchoose">
                <img :src="item.imgurl" v-else>
                <span :class="{spanStatus: index == isSelect}">{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            tab:[
                { name: "首页", id: 0, imgurl: require('../../assets/img/tab/menu_home@2x.png'), imgurlchoose: require('../../assets/img/tab/tab-home@2x.png')},
                { name: "发布", id: 1, imgurl: require('../../assets/img/tab/menu_publish@2x.png')}, 
                { name: '抢购', id: 2, imgurl: require('../../assets/img/tab/menu_shop@2x.png')}, 
                { name: '我的', id: 3, imgurl: require('../../assets/img/tab/menu_me@2x.png'), imgurlchoose: require('../../assets/img/tab/tab-me@2x.png')}],
            isSelect: 0,
        }
    },
    created(){
        if(this.$route.name == 'my'){
            this.isSelect = 3
        }else if(this.$route.name == 'home'){
            this.isSelect = 0
        }else if(this.$route.name == 'release'){
            // this.isSelect = 1
            window.location.href = 'https://100000266743.retail.n.weimob.com/saas/retail/100000266743/63831743/shop/index'
        }else {
            // this.isSelect = 2
        }
    },
    methods: {
        tabChange(item, index){
            this.isSelect = index;
            if(item.id == 0){
                this.$router.push('/home/choice')
            }else if(item.id == 1){
                this.$router.push('/release/firstStep')
            }else if(item.id == 2){
                Toast('请前往微信搜索一起玩电商并打开查看')
            }else{
                this.$router.push('/my')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabbar{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50/375*100vw;
        display: flex;
        background: #fff;
        z-index: 1000;
        .tablist{
            flex: auto;
            display: inline-block;
            height: 100%;
            text-align: center;
            font-size: 0;
            img{
                display: inline-block;
                width: 30/375*100vw;
                height: 30/375*100vw;
                margin-top: 3/375*100vw;
            }
            span{
                display: block;
                font-size: 10/375*100vw;
                color:rgba(53,59,72,1);
            }
            .spanStatus{
                color:rgba(38,193,37,1);
                font-weight: 500;
            }
        }
    }
</style>

