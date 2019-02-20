<template>
    <div class="blankcard">
        <div class="name container">
            <span>持卡人</span>
            <div>
                <input type="text" placeholder="与银行卡名字一致" v-model="name">
            </div>
        </div>
        <div class="blank container">
            <span>银行</span>
            <div>
                <select v-model="bankName">
                    <option v-for="(item, index) in blankList" :key="index + '_blankList'" :value="item">{{item}}</option>
                </select>
            </div>
        </div>
        <div class="blankName container">
            <span>支行名称</span>
            <div>
                <input type="text" v-model="bankBranch">
            </div>
        </div>
        <div class="blankNum container">
            <span>银行卡号</span>
            <div>
                <input type="number" v-model="account">
            </div>
        </div>
        <div class="phone container">
            <span>银行预留手机号</span>
            <div>
                <input type="number" v-model="mobile">
            </div>
        </div>
        <div class="submit" @click="addCard">
            <span>确认</span>
        </div>
    </div>
</template>

<script>
import {addAccount} from '@/http/api'
import cookie from '@/lib/cookie'
import { Toast, Indicator } from 'mint-ui';
export default {
    name: 'blankcard',
    data(){
        return{
            blankList: ['中国工商银行', '中国农业银行', '中国建设银行', '中国银行', '中国民生银行', '中国邮政储蓄银行', '招商银行', '光大银行', '中信银行', '交通银行'],
            name: '', //姓名
            bankName: '', //银行名称
            bankBranch: '', //支行
            account: '', //银行卡号
            mobile: '', //手机号
            blankReg: /^([1-9]{1})(\d{15}|\d{18})$/,
            phoneReg: /^(1[3-9]{1})\d{9}$/
        }
    },
    created(){

    },
    methods: {
        addCard(){
            switch(true){
                case this.name == '':
                    Toast('持卡人不能为空')
                    return false
                break
                case this.bankBranch == '':
                    Toast('支行名称不能为空')
                    return false
                break
                case this.account == '':
                    Toast('银行卡号不能为空')
                    return false
                break
                case !this.blankReg.test(this.account):
                    Toast('请输入正确银行卡号')
                    return false
                break
                case this.mobile == '':
                    Toast('手机号码不能为空')
                    return false
                break
                case !this.phoneReg.test(this.mobile):
                    Toast('请输入正确的手机号')
                    return false
                break
            }
            let param = {
                account: this.account,
                accountId: null,
                addr: null,
                bankBranch: this.bankBranch,
                bankName: this.bankName,
                idCard: null,
                mobile: this.mobile,
                name: this.name,
                userId: cookie.getCookie('userId') == 'undefined' ? '' : cookie.getCookie('userId')
            }
            addAccount(param).then(res => {
                console.log(res);
                if(res && res.code == 0){
                    this.$router.push('/takecash')
                }else{
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .blankcard{
        margin: 0 18/375*100vw;
        .container{
            margin-top: 24/375*100vw;
            span{
                font-size: 13/375*100vw;
                color: #71757E;
            }
            div{
                border: 1/375*100vw solid #9A9DA3;
                border-radius: 4/375*100vw;
                // padding-left: 13/375*100vw;
                margin-top: 10/375*100vw;
                padding: 6/375*100vw;
                input{
                    display: inline-block;
                    font-size: 13/375*100vw;
                    width: 95%;
                    outline: none;
                    border: none;
                }
                select{
                    outline: none;
                    border: none;
                    background: #fff;
                }
            }
        }
        .submit{
            width: 179/375*100vw;
            height: 45/375*100vw;
            text-align: center;
            line-height: 45/375*100vw;
            background: linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
            border-radius: 5/375*100vw;
            color: #fff;
            line-height: 45/375*100vw;
            font-size: 16/375*100vw;
            margin: 0 auto;
            margin-top: 44/375*100vw;
        }
    }
</style>

