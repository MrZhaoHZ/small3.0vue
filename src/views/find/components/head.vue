<template>
    <div class="findhead">
        <ul>
            <li class="list" v-for="(item, index) in data" :key="index + '_data'" @click="select(item, index)">
                <span :class="{'spanColor' : index == isSelect}">{{item.name}}</span>
                <i :class="{'triangle' : index == isSelect}"></i>
            </li>
        </ul>
        <div class="content" v-show = show>
            <ul>
                <li v-for="(itemlist, i) in itemData" :key="i + '_itemData'" @click="choose(itemlist, i)">
                    <span :class="{'spanChoose' : i == isSpan}">{{itemlist.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getProductCatalogList} from '@/http/api'
import { Toast, Indicator } from 'mint-ui'
export default {
    data(){
        return{
            data: [{name: '全部地区', id: 0}, {name: '活动类型', id: 1}, {name: '时间', id: 2}, {name: '价格', id: 3}],
            isSelect: -1,
            areaData: [{name: '全部', cityId: ''}, {name: '杭州', cityId: '935'}, {name: '合肥', cityId: '1030'}, {name: '宿州', cityId: '1112'}, {name: '马鞍山', cityId: '1058'}, {name: '安庆', cityId: '1080'}, {name: '阜阳', cityId: '1106'}],
            catalogData: null,
            timeData: [{name: '全部', timeId: ''}, {name: '今天', timeId: '1'}, {name: '明天', timeId: '2'}, {name: '本周', timeId: '3'}, {name: '本周末', timeId: '4'}, {name: '本月', timeId: '5'}],
            priceData: [{name: '全部', priceId: ''}, {name: '免费', priceId: '1'}, {name: '收费', priceId: '2'}],
            itemData: null,
            isSpan: -1,
            show: false,
            param: {
                catalogId: null,
                cityId: null,
                priceId: null,
                timeId: null
            },
            isLastSpan: null
        }
    },
    created(){
        this.getData();
    },
    methods: {
        select(item, index){
            if(this.show && index == this.isSelect){
                this.show = false
            }else{
                if(index != this.isSelect){
                    this.isSpan = -1
                }
                this.show = true
                this.isSelect = index
                if(index == 0){
                    this.itemData = this.areaData
                }else if(index == 1){
                    this.itemData = this.catalogData
                }else if(index == 2){
                    this.itemData = this.timeData
                }else{
                    this.itemData = this.priceData
                }
            }
            
        },
        getData(){
            getProductCatalogList().then(res => {
                if(res && res.code == 0){
                    this.catalogData = res.data
                }else{
                    Toast(res.msg)
                }
            })
        },
        choose(itemlist, i){
            this.isLastSpan = this.isSpan
            this.isSpan = i
            this.data[this.isSelect].name = itemlist.name
            this.show = false
            if(this.isSelect == 0){
                this.param.cityId = itemlist.cityId
            }else if(this.isSelect == 1){
                this.param.catalogId = String(itemlist.id)
            }else if(this.isSelect == 2){
                this.param.timeId = itemlist.timeId
            }else if(this.isSelect == 3){
                this.param.priceId = itemlist.priceId
            }
            if(this.isLastSpan != this.isSpan){
                this.$emit('choose', this.param)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .findhead{
        position: relative;
        // border-bottom: 2/375*100vw solid #aaa;
        box-shadow:2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        .list{
            display: inline-block;
            width: 25%;
            text-align: center;
            height: 35/375*100vw;
            font-size: 14/375*100vw;
            color: #333333;
            .spanColor{
                color: #34CA8C;
            }
            i{    
                display: inline-block;
                width: 0;
                height: 0;
                border-top: 7/375*100vw solid #aaa;
                border-left: 4/375*100vw solid transparent;
                border-right: 4/375*100vw solid transparent;
                transition: border-top .5s linear;
            }
            .triangle{
                // display: inline-block;
                // width: 0;
                // height: 0;
                border-top: 0;
                border-bottom: 7/375*100vw solid #aaa;
                transition: border-bottom .5s linear;
                // border-left: 4/375*100vw solid transparent;
                // border-right: 4/375*100vw solid transparent;
            }
        }
        .content{
            position: absolute;
            left: 0;
            // top: 0;
            width: 100%;
            z-index: 100;
            background: #fff;
            ul{
                margin: 0 20/375*100vw;
                li{
                    height: 43/375*100vw;
                    line-height: 43/375*100vw;
                    border-bottom: 1/375*100vw solid #eee;
                    color: #71757E;
                    font-size: 14/375*100vw;
                    .spanChoose{
                        color: #34CA8C;
                    }
                }
            }
        }
    }
</style>

