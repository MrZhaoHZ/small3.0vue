<template>
    <div class="type">
        <h3>活动类型</h3>
        <div class="content">
            <ul>
                <li v-for="(item, index) in typeList" :key="index+'_type'" :data-id="item.id" @click="selectType(item, index)" :class="{chooseIt:isSelect == index}">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getProductCatalogList} from '@/http/api'
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            typeList: [],
            isSelect: 0,
            catalogId: 1, //类型id
        }
    },
    created(){
        this.getType();
        if(this.$store.state.release.firstStep.typeData){
            this.isSelect = this.$store.state.release.firstStep.typeData.isSelect;
            this.catalogId = this.$store.state.release.firstStep.typeData.catalogId;
        }
    },
    methods: {
        // 获取活动类型
        getType(){
            getProductCatalogList().then((res) => {
                if(res.code == 0){
                    this.typeList = res.data;
                }else{
                    console.log(res.msg)
                }
            }, err => {
                console.log(err);
            })
        },
        // 选择活动类型
        selectType(item, index){
            this.isSelect = index;
            this.catalogId = item.id;
            // this.$emit('typeData', this.catalogId)
            this.$store.commit('firstStepType', {catalogId: this.catalogId, isSelect: this.isSelect})
        }
    }
}
</script>

<style lang="scss" scoped>
    .type{
        padding-bottom: 26/375*100vw;
        h3{
            margin: 0;
            font-size: 15/375*100vw;
            margin-top: 26/375*100vw;
        }
        .content{
            width: 310/375*100vw;
            height: 40/375*100vw;
            overflow-y: hidden;
            overflow-x: scroll;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            margin-top: 12/375*100vw;
            &::-webkit-scrollbar{
                display:none;
            }
            ul{
                height: 88/375*100vw;
                li{
                    display: inline-block;
                    width: 88/375*100vw;
                    height: 40/375*100vw;
                    line-height: 40/375*100vw;
                    text-align: center;
                    box-sizing: border-box;
                    margin-right: 10/375*100vw;
                    border-radius: 4/375*100vw;
                    font-size: 14/375*100vw;
                    background: #F9F9F9;
                    color: #404852;
                }
                .chooseIt{
                    background: linear-gradient(to right, #79E9AC , #34CA8C);
                    color: #fff;
                }
            }
        }
    }
</style>

