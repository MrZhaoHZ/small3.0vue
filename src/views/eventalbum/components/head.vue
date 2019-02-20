<template>
    <div class="eventalbumHead" v-if="albumHeadData">
        <p class="name">{{albumHeadData.name}}</p>
        <div class="msg">
            <span class="num">{{albumHeadData.total}}张照片</span>
            <div class="right">
                <span class="btn" v-if="albumHeadData.status == 1" @click="uploadphotos">上传照片</span>
                <span class="icon" @click="edit"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isEdit: false, //true编辑，false不可编辑
        }
    },
    props: {
        albumHeadData: Object
    },
    methods: {
        uploadphotos(){
            this.$router.push({
                path: '/uploadphotos',
                query: {
                    productId: this.$route.query.productId
                }
            })
        },
        edit(){
            if(this.isEdit){
                this.isEdit = false
                this.$emit('edit', false)
            }else{
                this.isEdit = true
                this.$emit('edit', true)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .eventalbumHead{
        margin: 0 18/375*100vw;
        margin-top: 17/375*100vw;
        .name{
            color: #000;
            font-size: 20/375*100vw;
            font-weight: 500;
            text-align: center;
        }
        .msg{
            margin-top: 20/375*100vw;
            .num{
                color: #9A9DA3;
                font-size: 14/375*100vw;
            }
            .right{
                float: right;
                .btn{
                    display: inline-block;
                    width: 80/375*100vw;
                    height: 32/375*100vw;
                    background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                    border-radius: 22/375*100vw;
                    text-align: center;
                    line-height: 32/375*100vw;
                    color: #fff;
                    font-size: 14/375*100vw;
                    font-weight: 500;
                    vertical-align: middle;
                }
                .icon{
                    display: inline-block;
                    width: 4/375*100vw;
                    height: 20/375*100vw;
                    margin-left: 16/375*100vw;
                    background: url('../../../assets/img/eventalbum/more.png') no-repeat;
                    background-size: 100% 100%;
                    vertical-align: middle;
                }
            }
        }
    }
</style>