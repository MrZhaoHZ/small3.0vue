<template>
    <div class="withdraw" v-if="withdraw">
        <ul>
            <li class="container" @click="takecash">
                <span class="title">可提现</span>
                <span class="balance">¥{{withdraw.balance}}</span>
                <span class="icon"></span>
            </li>
            <li class="container" @click="record">
                <span class="title">已提现</span>
                <span class="icon"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props: {
        withdraw: Object
    },
    methods: {
        takecash(){
            this.$router.push({
                path: '/takecash',
                query: {
                    balance: this.$props.withdraw.balance
                }
            })
        },
        record(){
            this.$router.push('/withdrawrecord')
        }
    }
}
</script>

<style lang="scss" scoped>
    .withdraw{
        margin: 0 18/375*100vw;
        .container{
            height: 48/375*100vw;
            border-bottom: 1/375*100vw solid #E5E5E5;
            line-height: 48/375*100vw;
            .title{
                font-size: 16/375*100vw;
                color: #71757E;
                margin-right: 10/375*100vw;
            }
            .balance{
                font-size: 16/375*100vw;
                color: #52D89A;
                font-weight: 500;
            }
            .icon{
                float: right;
                width: 10/375*100vw;
                height: 10/375*100vw;
                background: url('../../../assets/img/my/ic_arr_right.png') no-repeat;
                background-size: 100% 100%;
                margin-top: 18/375*100vw;
            }
        }
    }
</style>

