<template>
    <div class="orderhead">
        <img :src="headData.coverUrl">
        <div class="content">
            <p class="name">
                {{headData.name}}
            </p>
            <p class="address">
                {{headData.address}}
            </p>
            <p class="time">
                {{actime}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            actime: null
        }
    },
    created(){
        let arr = [];
        arr = this.$props.headData.acttime.split('-');
        let arr1 = [];
        let arr2 = [];
        arr1 = arr[0].split(' ');
        arr2 = arr[1].split(' ');
        this.actime = arr1[0] + '-' + arr2[0]
    }, 
    props: {
        headData: Object
    }
}
</script>

<style lang="scss" scoped>
    .orderhead{
        position: relative;
        // margin: 0 18/375*100vw;
        height: 110/375*100vw;
        background: rgba(255,255,255,1);
        box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        border-radius: 6/375*100vw;
        margin-top: 27/375*100vw;
        img{
            position: absolute;
            left: 0;
            top: 50%;
            transform: translate(0, -50%);
            width: 130/375*100vw;
            height: 90/375*100vw;
        }
        .content{
            display: inline-block;
            margin-left: 140/375*100vw;
            .name{
                font-size: 14/375*100vw;
                color:rgba(28,28,28,1);
                font-weight:500;
                margin-top: 12/375*100vw;
                max-height: 40/375*100vw;
                overflow: hidden;
            }
            .address, .time{
                font-size: 12/375*100vw;
                font-weight:300;
                color:rgba(155,155,155,1);
            }
            .address{
                margin-top: 10/375*100vw;
            }
        }
    }
</style>

