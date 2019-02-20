<template>
    <div class="richtext">
        <div class="content" v-for="(item, index) in richtext" :key="index+'_richtext'">
            <textarea class="text" v-model="item.src" v-if="item.type=='text'"></textarea>
            <div class="img" v-if="item.type=='image'">
                <input type="file" :id="'uploader_'+index" @change="uploading($event, index)" ref="inputImg">
                <label :for="'uploader_'+index" :class="['uploader', {'uploaderOpacity': item.isOpacity}]">
                    <img src="@/assets/img/release/add.png">
                </label>
                <img :src="item.src[0]" v-if="item.src[0]">
            </div>
        </div>
        <div class="btn">
            <span @click="addImg">添加图片</span>
            <span @click="addText">添加文字</span>
        </div>
        <div class="submit" @click="submit">
            <span>提交</span>
        </div>
    </div>
</template>

<script>
import {uploadImg} from '@/http/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            richtext: [],
        }
    },
    created(){
        if(this.$store.state.release.secondStep.descriptionData.richtext){
            this.richtext = this.$store.state.release.secondStep.descriptionData.richtext;
        }
    },
    methods: {
        addImg(){
            this.richtext.push({
                src: [],
                isOpacity: false,
                type: 'image'
            })
        },
        addText(){
            this.richtext.push({
                src: '',
                isOpacity: false,
                type: 'text'
            })
        },
        uploading(e, index){    
            let file = e.target.files[0];
            if(file.size > 5*1024*1024){
                Toast('你上传的图片不符合规则,上传图片的大小不能超过5M');
                return false
            }
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let _this = this;
            reader.onload = function(e){
                let param = {
                    file: reader.result
                }
                Indicator.open('上传中...');
                uploadImg(param).then(res => {
                    Indicator.close();
                    if(res.code == 0){
                        _this.richtext[index].src = [];
                        _this.richtext[index].src.push(res.data.imgUrl);
                        _this.richtext[index].isOpacity = true;
                    }else{
                        Toast(res.msg);
                    }
                }, err => {
                    console.log(err);
                    Indicator.close();
                })
            }
        },
        submit(){
            if(this.richtext.length == 0){
                Toast('请描述你的活动吧')
            }else{
                console.log(this.richtext);
                this.$store.commit('secondStepDescription', {richtext: this.richtext})
                this.$router.push('/release/secondStep')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .richtext{
        margin: 0 20/375*100vw;
        margin-top: 20/375*100vw;
        background: #fff;
        border-radius: 10/375*100vw;
        overflow: auto;
        .content{
            padding-top: 20/375*100vw;
            .text{
                display: block;
                width: 312/375*100vw;
                height: 95/375*100vw;
                margin: 0 auto;
                resize: none;
                outline: none;
                border: 1px solid #ccc;
                border-radius: 4/375*100vw;
                // border: none;
            }
            .img{
                position: relative;
                width: (312/375)*100vw;
                height: (140/375)*100vw;
                // overflow: hidden;
                margin: 0 auto;
            }
            .uploader{
                position: relative;
                display: block;
                // width: (312/375)*100vw;
                height: (140/375)*100vw;
                // margin: 0 auto;
                background: #F9F9F9;
                border-radius: (10/375)*100vw;
                z-index: 100;
                line-height: (140/375)*100vw;
                img{
                    // display: inline-block;
                    position: absolute;
                    left: 50%;
                    // right: 0;
                    top: 50%;
                    // bottom: 0;
                    transform: translate(-50%, -50%);
                    width: 31/375*100vw;
                    height: 31/375*100vw;
                }
            }
            .uploaderOpacity{
                opacity: 0;
                z-index: 10000;
            }
            input{
                position: absolute;
                left: -999999999px;
                top: -99999999px;
            }
            img{
                position: absolute;
                left: 0;
                top: 0;
                width: (312/375)*100vw;
                height: (140/375)*100vw;
                margin: 0 auto;
                border-radius: (10/375)*100vw;
                z-index: 10;
            }
        }
        .btn{
            text-align: center;
            color: #fff;
            padding-top: 30/375*100vw;
            span{
                display: inline-block;
                width: 100/375*100vw;
                height: 40/375*100vw;
                background: linear-gradient(to right, #79E9AC , #34CA8C);
                line-height: 40/375*100vw;
                border-radius: 4/375*100vw;
                font-size: 14/375*100vw;
            }
        }
        .submit{
            text-align: center;
            color: #fff;
            margin: 40/375*100vw 20/375*100vw;
            background: linear-gradient(to right, #79E9AC , #34CA8C);
            height: 50/375*100vw;
            line-height: 50/375*100vw;
            font-size: 16/375*100vw;
            border-radius: 6/375*100vw;
        }
    }
</style>

