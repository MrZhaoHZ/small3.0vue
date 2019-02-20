<template>
    <div class="ownertribeHead" v-if="headData">
        <img class="bgImg" :src="headData.tribe.icoUrl">
        <div class="mask"></div>
        <div class="content">
            <div class="avatar">
                <img :src="headData.tribe.icoUrl">
                <span v-if="headData.isMz == 1" class="icon"></span>
            </div>
            <div class="name">
                <span>{{headData.tribe.name}}</span>
                <span v-if="headData.isMz == 1" class="icon-edit"></span>
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
    }
}
</script>

<style lang="scss" scoped>
    .ownertribeHead{
        position: relative;
        width: 100%;
        height: 215/375*100vw;
        .bgImg{
            width: 100%;
            height: 100%;
            filter: blur(3px);
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: .4);
        }
        .content{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            .avatar{
                position: relative;
                margin: 0 auto;
                margin-top: 20/375*100vw;
                width: 80/375*100vw;
                height: 80/375*100vw;
                border-radius: 8/375*100vw;
                border: 4/375*100vw solid #fff;
                img{
                    width: 100%;
                    height: 100%;
                }
                .icon{
                    position: absolute;
                    right: -15/375*100vw;
                    bottom: -15/375*100vw;
                    width: 30/375*100vw;
                    height: 30/375*100vw;
                    background: url('../../../assets/img/ownertribe/icon-avatar.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            .name{
                margin-top: 20/375*100vw;
                font-size: 22/375*100vw;
                color: #fff;
                text-align: center;
                .icon-edit{
                    display: inline-block;
                    width: 18/375*100vw;
                    height: 18/375*100vw;
                    background: url('../../../assets/img/ownertribe/icon_edit.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>

