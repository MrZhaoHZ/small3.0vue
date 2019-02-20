<template>
    <div class="poster">
        <h3>活动海报</h3>
        <input type="file" id="uploader" @change="uploading" ref="inputImg">
        <label for="uploader" :class="['uploader', {'uploaderOpacity': isOpacity}]">
            <img src="@/assets/img/release/add.png" alt="">
        </label>
        <img :src="imgUrl" v-if="imgUrl">
        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade"
            :closeOnClickModal="false">
            <vueCropper
                ref="cropper"
                :img="optionData.img"
                :outputSize="optionData.size"
                :info="true"
                :canScale="false"
                :autoCrop="true"
                :autoCropWidth="optionData.width"
                :autoCropHeight="optionData.height"
                :fixed="true"
                :fixedNumber="optionData.fixedNumber"
                :full="true"
                :fixedBox="true"
                :original="optionData.original"
                :centerBox="true"
            ></vueCropper>
            <div class="foot">
                <span @click="cancel">取消</span>
                <span @click="determine">确定</span>
            </div>
        </mt-popup>
        <div class="showIndicator" v-show="show">
            <span>
                上传中...
            </span>
        </div>
    </div>
</template>

<script>
import { uploadImg } from '@/http/api'
import { Indicator, Toast, Popup} from 'mint-ui';
import { VueCropper } from 'vue-cropper'
export default {
    data(){
        return{
            imgUrl: null,
            isOpacity: false,
            popupVisible: false,
            optionData: {
                img: null,
                size: 1,
                width: 750,
                height: 375,
                fixedNumber: [2, 1],
                original: false,
            },
            show: false
        }
    },
    components: {
        VueCropper
    },
    created(){
        if(this.$store.state.release.firstStep.posterData){
            this.imgUrl = this.$store.state.release.firstStep.posterData.cover_url;
            this.isOpacity = this.$store.state.release.firstStep.posterData.isOpacity;
        }
    },
    methods: {
        // 上传图片
        uploading(){
            let file = this.$refs.inputImg.files[0];
            console.log(file)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let _this = this;
            reader.onload = function(e){
                _this.optionData.img = reader.result
                _this.popupVisible = true
            }
        },
        cancel(){
            this.optionData.img = null;
            this.popupVisible = false;
            this.show = false;
        },
        determine(){
            this.$refs.cropper.getCropBlob((data) => {
                console.log(data);
                if(data.size < 5*1024*1024){
                    this.$refs.cropper.getCropData((imgData) => {
                        let param = {
                            file: imgData
                        }
                        this.show = true;
                        uploadImg(param).then( res => {
                            if(res.code == 0){
                                this.imgUrl = res.data.imgUrl;
                                this.isOpacity = true;
                                this.popupVisible = false;
                                this.$store.commit('firstStepPoster', {cover_url: this.imgUrl, isOpacity: this.isOpacity});
                                Indicator.close();
                                this.show = false;
                            }else{
                                this.show = false;
                                Toast(res.msg);
                            }
                        }, err => {
                            this.show = false;
                            console.log(err);
                        })
                    })
                }else{
                    Toast({
                        message: '你上传的图片不符合规则,上传图片的大小不能超过5M',
                        position: 'top'
                    });
                }
            })

        }
    }
}
</script>

<style lang="scss" scoped>
    .poster{
        position: relative;
        padding-top: 26/375*100vw;
        h3{
            color: #3F4658;
            font-size: (15/375)*100vw;
            margin: 0;
            margin-bottom: (12/375)*100vw;
        }
        .uploader{
            position: relative;
            display: block;
            width: (312/375)*100vw;
            height: (140/375)*100vw;
            line-height: (140/375)*100vw;
            margin: 0 auto;
            background: #F9F9F9;
            border-radius: (10/375)*100vw;
            z-index: 100;
            text-align: center;
            img{
                position: absolute;
                left: 0;
                right: 0;
                width: 31/375*100vw;
                height: 31/375*100vw;
            }
        }
        .uploaderOpacity{
            opacity: 0;
        }
        input{
            position: absolute;
            left: -999999999px;
            top: -99999999px;
        }
        img{
            position: absolute;
            left: 0;
            top: 60/375*100vw;
            width: (312/375)*100vw;
            height: (140/375)*100vw;
            margin: 0 auto;
            border-radius: (10/375)*100vw;
            z-index: 1;
        }
        .mint-popup{
            width: 100%;
            height: 375/375*100vw;
            .foot{
                text-align: right;
                color: #fff;
                span{
                    display: inline-block;
                    width: 80/375*100vw;
                    height: 30/375*100vw;
                    border-radius: 4/375*100vw;
                    text-align: center;
                    line-height: 30/375*100vw;
                    background: linear-gradient(to right, #79E9AC , #34CA8C);
                }
            }
        }
        .showIndicator{
            position: absolute;
            width: 100/375*100vw;
            height: 100/375*100vw;
            text-align: center;
            line-height: 100/375*100vw;
            background: rgba(51, 51, 51, .7);
            border-radius: 4/375*100vw;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            z-index: 10000000;
            span{
                animation: showDisappear 1s infinite
            }
        }
        @keyframes showDisappear {
            0% {
                opacity: 1;
            }
            25% {
                opacity: 0.75;
            }
            50% {
                opacity: 0.5;
            }
            75% {
                opacity: 0.25;
            }
            100% {
                opacity: 0;
            }
        }
    }
</style>

