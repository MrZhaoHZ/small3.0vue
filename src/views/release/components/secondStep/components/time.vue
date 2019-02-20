<template>
    <div class="ac-time">
        <h3>活动时间</h3>
        <div class="select-time">
            <p class="start-time"  @click="openPicker(0)">
                <span class="text">{{startDate}}</span>
                <span class="icon"></span>
            </p>
            <span>至</span>
            <p class="end-time"  @click="openPicker(1)">
                <span class="text">{{endDate}}</span>
                <span class="icon"></span>
            </p>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="datetime"
            v-model="pickerValue"
            :startDate="nowTime"
            @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>

<script>
import { DatetimePicker } from 'mint-ui';
export default {
    data(){
        return{
            pickerValue: '',
            nowTime: new Date(),
            startDate: '开始时间', //开始时间
            endDate: '结束时间', //结束时间
            flag: true, //开始为true,结束为false
        }
    },
    created(){
        this.startDate = this.$store.state.release.secondStep.timeData.startDate;
        this.endDate = this.$store.state.release.secondStep.timeData.endDate;
    },
    methods: {
        openPicker(i) {
            if(i == 0){
                this.flag = true;
            }else if(i == 1){
                this.flag = false;
            }
            this.$refs.picker.open();
        },
        handleConfirm(){
            if(this.pickerValue == ''){
                this.pickerValue = new Date();
            }
            let year = this.pickerValue.getFullYear();
            let month = this.pickerValue.getMonth() + 1;
            if(month < 10){
                month = '0' + month;
            }
            let date = this.pickerValue.getDate();
            if(date < 10){
                date = '0' + date;
            }
            let hour = this.pickerValue.getHours();
            if(hour < 10){
                hour = '0' + hour;
            }
            let minute = this.pickerValue.getMinutes();
            if(minute < 10){
                minute = '0' + minute;
            }
            let timedate = year + '-' + month + '-' + date + ' ' + hour + ':' + minute
            if(this.flag){
                this.startDate = timedate;
                console.log(this.startDate);
            }else{
                this.endDate = timedate;
                console.log(this.endDate);
            }
            this.$store.commit('secondStepTime', {startDate: this.startDate, endDate: this.endDate})
        }
    }
}
</script>

<style lang="scss" scoped>
    .ac-time{
        h3{
            font-size: 15/375*100vw;
            color: #333333;
            margin: 0;
            margin-bottom: 12/375*100vw;
            margin-top: 26/375*100vw;
        }
        .select-time{
            .start-time, .end-time{
                display: inline-block;
                width: 138/375*100vw;
                height: 50/375*100vw;
                line-height: 50/375*100vw;
                background: #f9f9f9;
                color: #CCCCCC;
                font-size: 12/375*100vw;
                border-radius: 4/375*100vw;
                .text{
                    margin-left: 16/375*100vw;
                }
            }
        }
    }
</style>
<style lang="scss">
    .ac-time{
        .picker{
            .mint-datetime-action{
                 color: #34CA8C;
            }
        }
    }
</style>


