<template>
    <div class="createTribeMain">
        <div class="uploader">
            <label for="img">
                <img :src="icoUrl" v-show="showimg">
            </label>
            <input type="file" id="img" @change="uploader">
        </div>
        <div class="name">
            <input type="text" placeholder="给你的部落起个响亮的名称~" v-model="name">
        </div>
        <div class="btn" @click="submit">
            <span>开启部落</span>
        </div>
    </div>
</template>

<script>
import { createTribe, uploadImg } from '@/http/api'
import { Toast, Indicator } from 'mint-ui';
import cookie from '@/lib/cookie'
export default {
    data(){
        return{
            icoUrl: null,
            showimg: false,
            name: null
        }
    },
    created(){

    },
    methods: {
        uploader(e){
            Indicator.open();
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let _this = this;
            reader.onload = function(e){
                let param = {
                    file: reader.result
                }
                uploadImg(param).then(res => {
                    Indicator.close();
                    // console.log(res)
                    if(res && res.code == 0){
                        _this.icoUrl = res.data.imgUrl
                        _this.showimg = true
                    }
                })
            }
        },
        submit(){
            switch(true){
                case !this.icoUrl:
                    Toast('请选择部落头像')
                    return false
                break;
                case !this.name:
                    Toast('请填写部落名称')
                    return false
                break;
            }
            let param = {
                icoUrl: this.icoUrl,
                name: this.name,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            createTribe(param).then( res => {
                if(res && res.code == 0){

                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .createTribeMain{
        margin-top: 40/375*100vw;
        .uploader{
            text-align: center;
            position: relative;
            label{
                position: relative;
                display: inline-block;
                width: 85/375*100vw;
                height: 85/375*100vw;
                background: url('../../../assets/img/createtribe/icon.png') no-repeat;
                background-size: 100% 100%;
                img{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 85/375*100vw;
                    height: 85/375*100vw;
                    // border: none;
                    border-radius: 3/375*100vw;
                }
            }
            input{
                position: absolute;
                left: -999999999px;
            }
            
        }
        .name{
            margin: 0 32/375*100vw;
            padding: 10/375*100vw 10/375*100vw;
            border: 1/375*100vw solid #F9F9F9;
            background: #F9F9F9;
            margin-top: 30/375*100vw;
            border-radius: 4/375*100vw;
            input{
                display: inline-block;
                border: none;
                outline: none;
                width: 90%;
                // height: 30/375*100vw;
                background: #F9F9F9;
            }
        }
        .btn{
            margin: 0 26/375*100vw;
            margin-top: 40/375*100vw;
            height: 56/375*100vw;
            color: #fff;
            background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
            border-radius: 10/375*100vw;
            text-align: center;
            line-height: 56/375*100vw;
            font-size: 18/375*100vw;
        }
    }
</style>

