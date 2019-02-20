<template>
    <div class="mymain">
        <ul>
            <li v-for="(item, index) in listData" :key="index + '_listData'" class="list" @click="toRoute(item, index)">
                <span>{{item.name}}</span>
                <i></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            listData: [{name: '我的钱包', id: 0}, {name: '我的现金券', id: 1}, {name: '我的收藏', id: 2}, {name: '商务合作', id: 3}, {name: '意见反馈', id: 4}]
        }
    },
    created(){

    },
    methods: {
        toRoute(item, index){
            if(item.id == 0){
                // Toast('请前往微信搜索一起玩电商打开查看')
                window.location.href = 'https://100000266743.retail.n.weimob.com/saas/retail/100000266743/63831743/user/member/center'
            }else if(item.id == 1){
                // Toast('请前往微信搜索一起玩电商打开查看')
                window.location.href = 'https://100000266743.retail.n.weimob.com/saas/retail/100000266743/63831743/market/coupon/index'
            }else if(item.id == 2){
                this.$router.push('/mycollection')
            }else if(item.id == 3){
                this.$router.push('/cooperation')
            }else if(item.id == 4){
                this.$router.push('/feedback')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .mymain{
        .list{
            margin: 0 12/375*100vw;
            height: 53/375*100vw;
            line-height: 53/375*100vw;
            border-bottom: 1/375*100vw solid #E6E6E6;
            padding-left: 9/375*100vw;
            color: #373C43;
            font-size: 15/375*100vw;
            i{
                float: right;
                width: 10/375*100vw;
                height: 10/375*100vw;
                background: url('../../../assets/img/my/ic_arr_right.png') no-repeat;
                background-size: 100% 100%;
                margin-top: 21/375*100vw;
            }
        }
    }
</style>

