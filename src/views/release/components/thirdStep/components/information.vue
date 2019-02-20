<template>
    <div class="information">
        <p class="title">
            报名信息:<span>（将标签选中为绿色时默认为报名时必填项）</span>
        </p>
        <ul class="list">
            <!-- <li v-for="(fixedItem, fixedindex) in fixedInformation" :key="fixedindex + '_fixedInformation'" class="fixedItem">{{fixedItem}}</li> -->
            <li v-for="(item, index) in allInformation" :key="index+'_information'" :class="[{itemInformation:(index+1)%3==0}, {fixedItem: formList.indexOf(item)!=-1}]" @click="choose($event, item)">{{item}}</li>
            <li class="customize" @click="addInformation"> 
                #自定义
            </li>
        </ul>
        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade">
            <div class="container">
                <textarea placeholder="#请输入自定义标签" v-model="customize"></textarea>
                <span class="addSure" @click="addSure">确定</span>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            allInformation: ['姓名', '电话', '年龄','地址','职业','邮箱'],
            customize: '',
            formList: [],
            popupVisible: false
        }
    },
    created(){
        this.formList = this.$store.state.release.thirdStep.informationData.formList;
        this.allInformation = this.$store.state.release.thirdStep.informationData.allInformation;
        // console.log(this.formList)
    },
    methods: {
        choose(e, item){
            if(e.target.classList.contains('fixedItem')){
                e.target.classList.remove('fixedItem');
                let index = this.formList.indexOf(item);
                this.formList.splice(index, 1)
            }else{
                e.target.classList.add('fixedItem');
                this.formList.push(item);
            }
            this.$store.commit('thirdStepInformation', {formList: this.formList, allInformation: this.allInformation})
        },
        addInformation(){
            // if(this.customize!=''&&(this.customize.length<15||this.customize.length>2)){
            //     this.allInformation.push(this.customize)
            //     this.customize = '';
            // }else{
            //     this.customize = '';
            // }
            this.popupVisible = true
        },
        addSure(){
            if(this.customize!=''&&(this.customize.length<15||this.customize.length>2)){
                this.allInformation.push(this.customize)
                this.customize = '';
                this.popupVisible = false;
            }else{
                Toast({
                    message: '自定义标签长度大于2小于15',
                    position: 'top',
                })
                this.customize = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .information{
        padding-top: 26/375*100vw;
        .title{
            font-size: 15/375*100vw;
            color: #333333;
            margin: 0;
            margin-bottom: 12/375*100vw;
            span{
                font-size: 12/375*100vw;
            }
        }
        .list{
            li{
                display: inline-block;
                width: 98/375*100vw;
                height: 40/375*100vw;
                // padding: 8/375*100vw 33/375*100vw;
                text-align: center;
                line-height: 40/375*100vw;
                background: #F9F9F9;
                margin-right: 8/375*100vw;
                margin-bottom: 10/375*100vw;
                border-radius: 4/375*100vw;
                box-sizing: border-box;
                overflow: hidden;
                font-size: 14/375*100vw;
                box-sizing: border-box;
            }
            .itemInformation{
                margin-right: 0;
            }
            .fixedItem{
                color: #34CA8C;
                border: 2/375*100vw solid #34CA8C;
            }
            .customize{
                margin-right: 0;
                margin-left: 0;
            }
        }
        .mint-popup{
            width: 350/375*100vw;
            height: 194/375*100vw;
            border-radius: 10/375*100vw;
            .container{
                width: 100%;
                height: 100%;
                border-radius: 10/375*100vw;
                padding: 20/375*100vw;
                textarea{
                   width: 310/375*100vw;
                   height: 100/375*100vw;
                   margin: 0 auto;
                   resize: none;
                   outline: none;
                }
                .addSure{
                    float: right;
                    // display: inline-block;
                    margin-right: 50/375*100vw;
                    width: 84/375*100vw;
                    height: 44/375*100vw;
                    text-align: center;
                    line-height: 44/375*100vw;
                    background:linear-gradient(133deg,rgba(121,233,172,1) 0%,rgba(52,202,140,1) 100%);
                    border-radius: 25/375*100vw;
                    color: #fff;
                }
            }
        }
    }
</style>

