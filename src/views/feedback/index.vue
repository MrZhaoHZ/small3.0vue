<template>
    <div class="feedback">
        <textarea placeholder="请输入您的宝贵意见" v-model="text"></textarea>
        <div class="btn" @click="submit">
            <span>提交</span>
        </div>
    </div>
</template>

<script>
import { feedback } from '@/http/api'
import cookie from '../../lib/cookie'
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            text: '',
        }
    },
    methods: {
        submit(){
            let param = {
                text: this.text,
                userId: cookie.getCookie('userId') == undefined ? '' : cookie.getCookie('userId')
            }
            feedback(param).then( res => {
                console.log(res);
                if(res && res.code == 0){
                    Toast('谢谢你的宝贵意见')
                    let _this = this
                    setTimeout(function(){
                        _this.$router.push('/my');
                    }, 3000)
                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .feedback{
        width: 100%;
        // margin: 0 10/275*100vw;
        textarea{
            padding: 20/375*100vw;
            display: block;
            width: 90%;
            height: 500/375*100vw;
            margin: 0 auto;
            border: none;
            outline: none;
            resize: none;
        }
        .btn{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 10/375*100vw;
            width: 90%;
            height: 40/375*100vw;
            line-height: 40/375*100vw;
            background: linear-gradient(to right, #79E9AC , #34CA8C);
            margin: 0 auto;
            border-radius: 6/375*100vw;
            text-align: center;
            color: #fff;
        }
    }
</style>

