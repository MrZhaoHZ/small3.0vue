<template>
    <div class="uploadphotosMain" v-if="photoList">
        <ul>
            <li v-for="(item, index) in photoList" :key="index + '_photoList'" :class="{'limargin': (index+2)%3 == 0}">
                <img :src="item">
                <span class="icon" @click="delImg(item,index)"></span>
                <label class="imgLabel" :for="index + '_renewImg'"></label>
                <input type="file" :id="index + '_renewImg'" @change="renew($event, item, index)">
            </li>
            <li class="add" v-if="photoList.length < 9">
                <label for="img"></label>
                <input type="file" id="img" @change="upload">
            </li>
        </ul>
        <div class="submit" @click="submit">
            <span>发布</span>
        </div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import { uploadImg, uploadProductPhoto } from '@/http/api'
import cookie from '../../../lib/cookie';
export default {
    data(){
        return{
            photoList: []
        }
    },
    methods: {
        //上传图片
        upload(e){
            let file = e.target.files[0]
            if(file.size > 5*1024*1024){
                Toast('上传的图片大小不能超过5M')
                return false
            }
            Indicator.open();
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let _this = this;
            reader.onload = function(e){
                let param = {
                    file: reader.result
                }
                uploadImg(param).then(res => {
                    Indicator.close();
                    console.log(res)
                    if(res && res.code == 0){
                        _this.photoList.push(res.data.imgUrl)
                    }
                })
            }
        },
        //删除图片
        delImg(item, index){
            this.photoList.splice(index, 1);
        },
        // 重新上传
        renew(e, item, index){
            let file = e.target.files[0]
            if(file.size > 5*1024*1024){
                Toast('上传的图片大小不能超过5M')
            }
            Indicator.open();
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let _this = this;
            reader.onload = function(e){
                let param = {
                    file: reader.result
                }
                uploadImg(param).then(res => {
                    Indicator.close();
                    if(res && res.code == 0){
                        _this.$set(_this.photoList, index, res.data.imgUrl)
                    }
                })
            }
        },
        //发布
        submit(){
            let param = {
                photoList: this.photoList,
                productId: this.$route.query.productId,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            uploadProductPhoto(param).then( res => {
                console.log(res)
                if(res && res.code == 0){
                    this.$router.push({
                        path: '/eventalbum',
                        query: {
                            productId: this.$route.query.productId
                        }
                    })
                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .uploadphotosMain{
        position: relative;
        top: -104/375*100vw;
        margin: 0 12/375*100vw;
        min-height: 344/375*100vw;
        box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        border-radius: 10/375*100vw;
        padding: 14/375*100vw;
        background: #fff;
        padding-bottom: 116/375*100vw;
        ul{
            font-size: 0;
            li{
                position: relative;
                display: inline-block;
                width: 105/375*100vw;
                height: 105/375*100vw;
                margin-bottom: 4/375*100vw;
                img{
                    width: 100%;
                    height: 100%;
                }
                .icon{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 16/375*100vw;
                    height: 16/375*100vw;
                    background: url('../../../assets/img/uploadphotos/del.png') no-repeat;
                    background-size: 100% 100%;
                    z-index: 102;
                }
                .imgLabel{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    z-index: 100;
                }
                input{
                    position: absolute;
                    left: -99999999999px;
                    z-index: 100;
                }
            }
            .limargin{
                margin: 0 4/375*100vw;
            }
            .add{
                label{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    background: url('../../../assets/img/uploadphotos/add.png') no-repeat;
                    background-size: 100% 100%;
                }
                input{
                    position: absolute;
                    left: -99999999999px;
                }
            }
        }
        .submit{
            position: absolute;
            left: 0;
            bottom: 20/375*100vw;
            width: 323/375*100vw;
            height: 56/375*100vw;
            text-align: center;
            line-height: 56/375*100vw;
            background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
            border-radius: 10/375*100vw;
            color: #fff;
            margin: 0 14/375*100vw;
        }
    }
</style>

