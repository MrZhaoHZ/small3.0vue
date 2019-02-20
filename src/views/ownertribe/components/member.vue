<template>
    <div class="ownertribeNav">
        <div class="head">
            <span class="title">群成员</span>
            <span class="icon">{{navData.count}}人</span>
        </div>
        <div class="main">
            <ul>
                <li v-for="(item, index) in navData.users" :key="index + '_users'">
                    <img :src="item.icoUrl">
                    <p class="name">{{item.nickName}}</p>
                </li>
                <li>
                    <img src="../../../assets/img/ownertribe/icon-invite.png">
                    <p class="name">邀请</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: {
        navData: Object
    }
}
</script>

<style lang="scss" scoped>
    .ownertribeNav{
        position: relative;
        top: -53/375*100vw;
        margin: 0 12/375*100vw;
        background: #fff;
        box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        border-radius: 10/375*100vw;
        height: 106/375*100vw;
        .head{
            margin: 0 10/375*100vw;
            padding-top: 10/375*100vw;

            .title{
                font-size: 14/375*100vw;
                color: #333;
            }
            .icon{
                margin-top: 2/375*100vw;
                float: right;
                color: #999;
                font-size: 12/375*100vw;
                &::after{
                    content: '';
                    display: inline-block;
                    width: 10/375*100vw;
                    height: 10/375*100vw;
                    background: url('../../../assets/img/ownertribe/icon-right.png') no-repeat;
                    background-size: 100% 100%;
                    margin-left: 6/375*100vw;
                }
            }
        }
        .main{
            margin: 0 10/375*100vw;
            margin-top: 8/375*100vw;
            ul{
                li{
                    display: inline-block;
                    margin-right: 16/375*100vw;
                    img{
                        width: 42/375*100vw;
                        height: 42/375*100vw;
                        border-radius: 50%;
                    }
                    .name{
                        position: relative;
                        top: -5/375*100vw;
                        width: 42/375*100vw;
                        font-size: 12/375*100vw;
                        color: #999;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>

