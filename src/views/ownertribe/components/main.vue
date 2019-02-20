<template>
    <div class="ownertribeMain">
        <div class="head">
            <span>每日打卡</span>
            <span>打卡管理</span>
        </div>
        <div class="main">
            <ul>
                <li v-for="(item, index) in mainData" :key="index + '_mainData'"></li>
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
        mainData: Array
    }
}
</script>

<style lang="scss" scoped>
    .ownertribeMain{
        position: relative;
        top: -43/375*100vw;
        margin: 0 12/375*100vw;
        box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        border-radius: 10/375*100vw;
        background: #fff;
        .head{
            padding-top: 10/375*100vw;
            margin: 0 10/375*100vw;
            span:first-child{
                font-size: 16/375*100vw;
                color: #333;
                font-weight: 500;
            }
            span:last-child{
                float: right;
                font-size: 12/375*100vw;
                color: #999;
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
    }
</style>

