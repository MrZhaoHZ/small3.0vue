<template>
    <div class="ownerhomehead" v-if="headData">
        <div>
            <div class="avatar">
                <img :src="headData.icoUrl">
                <span class="age">{{headData.sex == '1' ? '♂' : '♀'}}{{headData.age}}</span>
            </div>
            <div class="content">
                <p class="nickname">{{headData.nickname}}</p>
                <p class="followerCount">{{headData.followerCount}}个粉丝</p>
            </div>
            <span class="attention" v-if="headData.status == 0">关注</span>
        </div>
        <div class="signature" v-if="headData.signature">
            <p>{{headData.signature}}</p>
            <span class="icon"></span>
        </div>
        <div class="tribe">
            <span class="name">{{headData.tribeName}}</span>
            <div class="member">
                <img v-for="(item, index) in headData.tribeIcoUrl" :key="index + '_tribeIcoUrl'" :src="item">
                <span class="num">{{headData.tirbeGroupNum}}人已加入</span>
                <span class="icon"></span>
            </div>
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
        headData: Object
    },
    created(){
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    .ownerhomehead{
        width: 100%;
        height: 200/375*100vw;
        background: url('../../../assets/img/ownerhomepage/bg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .avatar{
            position: relative;
            display: inline-block;
            width: 60/375*100vw;
            height: 60/375*100vw;
            margin-top: 20/375*100vw;
            margin-left: 16/375*100vw;
            vertical-align: middle;
            img{
                width: 60/375*100vw;
                height: 60/375*100vw;
                border-radius: 50%;
            }
            .age{
                position: absolute;
                right: -5/375*100vw;
                bottom: 0;
                font-size: 12/375*100vw;
                color: #fff;
                width: 32/375*100vw;
                height: 19/375*100vw;
                text-align: center;
                line-height: 19/375*100vw;
                background: #35BF86;
                border-radius: 10/375*100vw;
            }
        }
        .content{
            display: inline-block;
            vertical-align: middle;
             margin-left: 12/375*100vw;
            .nickname{
                color: #fff;
                font-size: 20/375*100vw;
                font-weight: 500;
                margin-top: 25/375*100vw;
            }
            .followerCount{
                font-size: 12/375*100vw;
                color: #fff;
            }
        }
        .attention{
            float: right;
            margin-top: 38/375*100vw;
            width: 66/375*100vw;
            height: 32/375*100vw;
            text-align: center;
            line-height: 32/375*100vw;
            background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            border-radius: 22/375*100vw;
            color: #fff;
            font-size: 14/375*100vw;
            font-weight:500;
            margin-right: 16/375*100vw;
        }
        .signature{
            position: relative;
            margin: 0 16/375*100vw;
            margin-top: 24/375*100vw;
            padding-bottom: 20/375*100vw;
            border-bottom: 1/375*100vw solid rgba($color: #fff, $alpha: .4);
            p{
                width: 322/375*100vw;
                color: #fff;
                font-size: 14/375*100vw;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .icon{
                // position: absolute;
                // right: 0;
                // top: 0;
                float: right;
                width: 10/375*100vw;
                height: 10/375*100vw;
                background: url('../../../assets/img/ownerhomepage/icon-right.png') no-repeat;
                background-size: 100% 100%;
                margin-top: -16/375*100vw;
            }
        }
        .tribe{
            position: absolute;
            left: 0;
            bottom: 18/375*100vw;
            width: 100%;
            .name{
                display: inline-block;
                color: #fff;
                font-size: 14/375*100vw;
                margin-top: 18/375*100vw;
                margin-left: 16/375*100vw;
            }
            .member{
                float: right;
                margin-top: 18/375*100vw;
                margin-right: 16/375*100vw;
                img{
                    display: inline-block;
                    width: 18/375*100vw;
                    height: 18/375*100vw;
                    border-radius: 50%;
                    margin-left: -9/375*100vw;
                    vertical-align: middle;
                    &:first-child{
                        margin-left: 0;
                    }
                }
                .num{
                    display: inline-block;
                    vertical-align: middle;
                    color: #FFFFFF;
                    font-size: 12/375*100vw;
                }
                .icon{
                    display: inline-block;
                    width: 10/375*100vw;
                    height: 10/375*100vw;
                    background: url('../../../assets/img/ownerhomepage/icon-right.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>