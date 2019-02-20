<template>
    <div class="add">
        <div class="head">
            <span>票面设置</span>
            <span @click="popup">服务费须知</span>
        </div>
        <div class="main" v-for="(ticket, i) in tickets" :key="i+'_ticketNum'">
            <div class="type">
                <span v-for="(item, index) in  ticket.type" :key="index+'_type'" :class="{itemSelect:index==ticket.isSelect}" @click="select($event, item, index, i)">{{item.name}}</span>
                <p @click="delTicket(i)">删除票券</p>
            </div>
            <div class="name">
                <span>名称:</span>
                <input type="text" v-model="ticket.name">
            </div>
            <div class="remarks">
                <span>说明:</span>
                <input type="text" v-model="ticket.remarks" placeholder="特殊情况请说明">
            </div>
            <div class="price" v-if="ticket.isPay">
                <span>票价:</span>
                <input type="text" v-model="ticket.price" placeholder="请输入价格">
            </div>
            <div class="content">
                <div class="num">
                    <span>总数:</span>
                    <input type="text" v-model="ticket.num">
                </div>
                <div class="limitednum">
                    <span>限购:</span>
                    <select v-model="ticket.limitednum">
                        <option v-for="(num, indexLimited) in limitedArr" :key="indexLimited+'_num'" :value="num.value">{{num.name}}</option>
                    </select>
                </div>
            </div>
            <div class="everyday">
                <span>指定日期</span>
                <mt-switch v-model="ticket.valueEvery" @change="everyday(i)"></mt-switch>
            </div>
            <div class="isaudit" v-if="!ticket.isPay">
                <span>报名审核</span>
                <mt-switch v-model="ticket.value" @change="reviewAudit(i)"></mt-switch>
            </div>
            <div class="isrefundable" v-if="ticket.isPay">
                <span>{{ticket.valueRefundable?'支持退款':'不支持退款'}}</span>
                <mt-switch v-model="ticket.valueRefundable" @change="reviewRefundable(i)"></mt-switch>
                <p class="point" v-if="ticket.valueRefundable">
                    委托平台代为处理退款事宜,将收取票价10%的服务费
                </p>
                <div class="reason" v-if="!ticket.valueRefundable">
                    <input type="text" placeholder="请输入不支持退款原因" v-model="ticket.message">
                </div>
            </div>
        </div>
        <div class="addnew" @click="addTicket" v-if="tickets.length < 10">
            <span>新增门票+</span>
        </div>
        <div class="determine" @click="determine">
            <span>确定</span>
        </div>
        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade">
            <div class="box">
                <p class="title">服务费须知</p>
                <p class="tip">活动结束申请提现时平台将会收取2.5%+1的服务费</p>
                <p class="explanation">例如：出售10张票，每张票定价100 手续费：100*2.5%*10+1*10=35元</p>
            </div>
        </mt-popup> 
    </div>
</template>
<script>
import { Popup, Switch, Toast } from 'mint-ui';
export default {
    data(){
        return{
            tickets: [],
            popupVisible: false,
            // limitedArr: ['1张', '2张', '3张', '4张', '5张', '不限购'],
            limitedArr: [{name: '1张', value: 1}, {name: '2张', value: 2}, {name: '3张', value: 3}, {name: '4张', value: 4}, {name: '5张', value: 5}, {name: '不限购', value: 0}]
        }
    },
    created(){
        this.tickets = this.$store.state.release.thirdStep.ticketsData.tickets;
    },
    methods: {
        // 选择免费还是付费
        select(e, item, index, i){
            this.tickets[i].isSelect = index;
            if(this.tickets[i].type[index].id == 0){
                this.tickets[i].name = '免费票'
                this.tickets[i].isPay = false
                this.tickets[i].isaudit = 'Y'
            }else{
                this.tickets[i].name = '付费票'
                this.tickets[i].isPay = true
                this.tickets[i].isaudit = 'N'
            }
        },
        // 添加票
        addTicket(){
            this.tickets.push({
                name: '免费票', //票种名称
                price: null, //价格
                num: null, //数量
                limitednum: 1, //限购
                isrefundable: 'Y', //退款
                isaudit: 'Y', //是否审核
                message: '', //拒绝理由
                status: 0, //状态
                remarks: '', //票种说明
                isPay: false, //是否是付费票
                value: true, // 是否审核
                valueRefundable: true, //是否退票
                isSelect: 0,
                type: [{name: '免费', id: 0}, {name: '付费', id: 1}],
                everyday: 0, //购票是否需要指定日期
                valueEvery: false
            })
        },
        // 服务须知
        popup(){
            this.popupVisible = true;
        },
        // 删除票
        delTicket(i){
            this.tickets.splice(i, 1);
        },
        //报名审核
        reviewAudit(i){
            if(this.tickets[i].value == true){
                this.tickets[i].isaudit = 'Y'
            }else{
                this.tickets[i].isaudit = 'N'
            }
        },
        // 支持退款
        reviewRefundable(i){
            if(this.tickets[i].valueRefundable == true){
                this.tickets[i].isrefundable = 'Y'
            }else{
                this.tickets[i].isrefundable = 'N'
            }
        },
        // 是否指定日期
        everyday(i){
            if(this.tickets[i].valueEvery == true){
                this.tickets[i].everyday = 1
            }else{
                this.tickets[i].everyday = 0
            }
        },
        // 确定
        determine(){
            if(this.tickets.length == 0){
                this.$router.push('/release/thirdStep')
            }else{
                let numberTicket = 0;
                for(let i =0, len = this.tickets.length; i < len; i ++){
                    if(this.tickets[i].limitednum == 0){
                        this.tickets[i].limitednum = this.tickets[i].num
                    }
                    numberTicket += Number(this.tickets[i].num)
                    switch(true){
                        case this.tickets[i].name.length > 10 || this.tickets[i].name.length < 2:
                            Toast('名称: ' + this.tickets[i].name + '  字数2-10')
                            return false;
                        break;
                        case this.tickets[i].remarks.length > 20 || this.tickets[i].remarks.length < 6 && this.tickets[i].remarks.length != 0:
                            Toast('说明:' + this.tickets[i].remarks + '  字数6-20个,可以不填写')
                            return false;
                        break;
                        case (this.tickets[i].price > 9999 || this.tickets[i].price < 0.01 || isNaN(Number(this.tickets[i].price))) && this.tickets[i].price!=null:
                            Toast('票价:' + this.tickets[i].price + '  价格在0.01-9999间')
                        break;
                        case this.tickets[i].num > 9999 || this.tickets[i].num < 1 || isNaN(Number(this.tickets[i].num)):
                            Toast('总数:' + this.tickets[i].num==null?'不能为空':this.tickets[i].num + '  数量在1-9999间')
                            return false
                        break;
                        case this.tickets[i].isrefundable == 'N' && (this.tickets[i].message.length > 50 || this.tickets[i].message.length < 5):
                            Toast(this.tickets[i].name + '退款理由字数5-50')
                            return false
                        break;
                    }
                }
                console.log(numberTicket)
                if(numberTicket != this.$store.state.release.secondStep.numData.num){
                    Toast('票的人数与活动人数不一致')
                    return false
                }
                // console.log(this.tickets);
                this.$store.commit('thirdStepTickets', {tickets: this.tickets})
                this.$router.push('/release/thirdStep')
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .add{
        margin: 0 12/375*100vw;
        margin-top: 12/375*100vw;
        height: 90%;
        background: #fff;
        border-radius: 10/375*100vw;
        padding: 0 20/375*100vw;
        .head{
            span{
                color: #3F4658;
                font-size: 15/375*100vw;
                display: inline-block;
                margin-top: 26/375*100vw;
            }
            span:last-child{
                float: right;
                text-decoration: underline;
            }
        }
        .main{
            border: 1px dashed #aaa;
            border-radius: 6/375*100vw;
            margin-top: 12/375*100vw;
            padding: 0 12/375*100vw;
            padding-bottom: 18/375*100vw;
            .type{
                span{
                    display: inline-block;
                    width: 88/375*100vw;
                    height: 40/375*100vw;
                    background: #F9F9F9;
                    color: #404852;
                    font-size: 14/375*100vw;
                    text-align: center;
                    line-height: 40/375*100vw;
                    margin-right: 12/375*100vw;
                    margin-top: 12/375*100vw;
                    border-radius: 4/375*100vw;
                }
                p{
                    float: right;
                    margin-top: 22/375*100vw;
                    // margin-right: 16/375*100vw;
                    font-size: 14/375*100vw;
                    color: #666666;
                }
                .itemSelect{
                    color: #fff;
                    background: linear-gradient(to right, #79E9AC , #34CA8C);
                }
            }
            .name, .remarks, .price{
                width: 100%;
                // height: 50/375*100vw;
                background: #F9F9F9;
                margin-top: 12/375*100vw;
                border-radius: 4/375*100vw;
                border: 1px solid #ddd;
                // line-height: 50/375*100vw;
                font-size: 14/375*100vw;
                padding: 10/375*100vw 0;
                span{
                    margin-left: 16/375*100vw;
                    margin-right: 10/375*100vw;
                }
                input{
                    border: none;
                    background: #F9F9F9;
                    height: 30/375*100vw;
                    outline: none;
                    width: 190/375*100vw;
                    caret-color:#52D89A; 
				    -webkit-tap-highlight-color:rgba(0,0,0,0);
                }
            }
            .content{
                height: 50/375*100vw;
                .num{
                    // display: inline-block;
                    float: left;
                    width: 135/375*100vw;
                    padding: 10/375*100vw 0;
                    background: #F9F9F9;
                    border-radius: 4/375*100vw;
                    border: 1px solid #ddd;
                    margin-top: 12/375*100vw;
                    font-size: 14/375*100vw;
                    span{
                        margin-left: 16/375*100vw;
                        margin-right: 10/375*100vw;
                    }
                    input{
                        border: none;
                        background: #F9F9F9;
                        height: 30/375*100vw;
                        outline: none;
                        width: 50/375*100vw;
                        caret-color:#52D89A; 
				        -webkit-tap-highlight-color:rgba(0,0,0,0);
                    }

                }
                .limitednum{
                    // display: inline-block;
                    float: right;
                    width: 135/375*100vw;
                    height: 50/375*100vw;
                    line-height: 50/375*100vw;
                    // padding: 10/375*100vw 0;
                    background: #F9F9F9;
                    border-radius: 4/375*100vw;
                    border: 1px solid #ddd;
                    margin-top: 12/375*100vw;
                    font-size: 14/375*100vw;
                    vertical-align: top;
                    &::after{
                        content: '';
                        display: inline-block;
                        width: 0;
                        height: 0;
                        border-left: 3/375*100vw solid transparent;
                        border-right: 3/375*100vw solid transparent;
                        border-top: 6/375*100vw solid rgba(168,170,183,1);
                    }
                    span{
                        display: inline-block;
                        height: 30/375*100vw;
                        line-height: 30/375*100vw;
                        margin-left: 16/375*100vw;
                        margin-right: 10/375*100vw;
                        vertical-align: middle;
                    }
                    select{
                        display: inline-block;
                        border: none;
                        background: #F9F9F9;
                        height: 30/375*100vw;
                        // width: 60/375*100vw;
                        line-height: 30/375*100vw;
                        // text-align: center;
                        appearance:none;
                        -moz-appearance:none;   
                        -webkit-appearance:none;
                        vertical-align: middle;      
                    }
                }
            }
            .isaudit, .isrefundable, .everyday{
                margin-top: 18/375*100vw;
                text-align: right;
                span{
                    display: inline-block;
                    vertical-align: middle;
                }
                .mint-switch{
                    display: inline-block;
                    vertical-align: middle;
                    .mint-switch-input:checked + .mint-switch-core{
                        background:linear-gradient(to right, #79E9AC , #34CA8C);
                        border-color: #34CA8C;
                    }
                }
            }
            .isrefundable{
                .point{
                    color: #ccc;
                    font-size: 12/375*100vw;
                    margin-top: 10/375*100vw;
                }
                .reason{
                    margin-top: 10/375*100vw;
                    border: 1px solid #ddd;
                    border-radius: 4/375*100vw;
                    padding-left: 20/375*100vw;
                    background: #F9F9F9;
                    font-size: 14/375*100vw;
                    padding: 12/375*100vw 0;
                    input{
                        width: 260/375*100vw;
                        height: 30/375*100vw;
                        outline: none;
                        background: #F9F9F9;
                        border: none;
                        caret-color:#52D89A; 
				        -webkit-tap-highlight-color:rgba(0,0,0,0);
                    }
                }
            }
        }
        .addnew{
            border: 1px dashed #aaa;
            border-radius: 6/375*100vw;
            margin-top: 12/375*100vw;
            height: 54/375*100vw;
            color: #3F4658;
            text-align: center;
            line-height: 54/375*100vw;
            margin-top: 16/375*100vw;
        }
        .determine{
            width: 310/375*100vw;
            height: 56/375*100vw;
            background: linear-gradient(to right, #79E9AC , #34CA8C);
            color: #fff;
            text-align: center;
            line-height: 56/375*100vw;
            border-radius: 6/375*100vw;
            margin-top: 30/375*100vw;
            margin-bottom: 30/375*100vw;
        }
        .box{
            width: 280/375*100vw;
            height: 194/375*100vw;
            .title{
                color: #000000;
                font-size: 18/375*100vw;
                text-align: center;
                margin-top: 25/375*100vw;
            }
            .tip{
                color: #888888;
                font-size: 15/375*100vw;
                width: 210/375*100vw;
                text-align: center;
                margin: 0 auto;
                margin-top: 10/375*100vw;
            }
            .explanation{
                color: #666;
                font-size: 13/375*100vw;
                width: 224/375*100vw;
                text-align: center;
                margin: 0 auto;
                margin-top: 16/375*100vw;
            }
        }
        .mint-popup{
            border-radius: 4/375*100vw;
        }
    }
</style>
<style lang="scss">
    .isaudit, .isrefundable, .everyday{
        .mint-switch-input:checked + .mint-switch-core{
            background:linear-gradient(to right, #79E9AC , #34CA8C);
            border-color: #34CA8C;
        }
    }
</style>

