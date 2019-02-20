<template>
    <div class="talent" v-if="talentData">
        <p class="talent-title-change">
            <span class="title">活动达人</span>
            <span class="change" @click="change">换一换</span>
            <span class="justify-span"></span>
        </p>
        <div class="content">
            <ul>
                <li class="content-list" v-for="(item, index) in talentData" :key="index + '_talentData'">
                    <img class="content-list-left" :src="item.wx_avatar">
                    <div class="content-list-right">
                        <p class="name">{{item.nick}}</p>
                        <p class="fans">{{item.fans_cnt}}粉丝</p>
                        <p class="tag">{{item.tags}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mengzhu } from '@/http/api'
import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            talentData: null,
            page: 1
        }
    },
    created(){
        this.getTalentData();
    },
    methods: {
        getTalentData(){
            Indicator.open();
            let param = {
                page: this.page,
                sex: 1,
                size: 2
            }
            mengzhu(param).then( res => {
                // console.log(res, 'talent')
                if(res.code == 0 && res.data.status){
                    Indicator.close();
                    this.returnNum = res.data.returnNum;
                    if(res.data.item){
                        this.talentData = res.data.item;
                        this.page ++
                    }else{
                        this.page = 1;
                        this.getTalentData();
                    }
                }else{
                    Toast(res.msg)
                    Indicator.close();
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })
        },
        change(){
            this.getTalentData();
        }
    }
}
</script>

<style lang="scss" scoped>
    .talent{
        margin: 0 20/375*100vw;
        margin-top: 36/375*100vw;
        .talent-title-change{
            text-align: justify;
            .title{
                display: inline-block;
                // width: 80/375*100vw;
                font-size: 20/375*100vw;
                color:rgba(28,28,28,1);
            }
            .change{
                display: inline-block;
                width: 60/375*100vw;
                font-size: 14/375*100vw;
                color:rgba(155,155,155,1);
                &::before{
                    content: '';
                    display: inline-block;
                    width: 9/375*100vw;
                    height: 9/375*100vw;
                    background: url('../../../../../assets/img/home/change.png') no-repeat;
                    background-size: 100% 100%;
                    margin-right: 6/375*100vw;
                }
            }
            .justify-span{
                display: inline-block;
                width: 100%;
            }
        }
        .content{
            .content-list{
                display: inline-block;
                width: 162/375*100vw;
                height: 88/375*100vw;
                box-shadow:0 2/375*100vw 12/375*100vw 0 rgba(82,87,104,0.12);
                border-radius: 4/375*100vw;
                &:first-child{
                    margin-right: 11/375*100vw;
                }
                .content-list-left, .content-list-right{
                    display: inline-block;
                    vertical-align: middle;
                }
                .content-list-left{
                    width: 56/375*100vw;
                    height: 56/375*100vw;
                    border-radius: 50%;
                    margin: 16/375*100vw 8/375*100vw;
                }
                .content-list-right{
                    margin: 15/375*100vw 0;
                    width: 72/375*100vw;
                    p{
                        width: 72/375*100vw;
                        overflow: hidden;
                        white-space:nowrap;
                    }
                    .name{
                        font-size: 14/375*100vw;
                        font-weight:500;
                        color: #000;
                    }
                    .fans{
                        font-size: 12/375*100vw;
                        color: #333;
                    }
                    .tag{
                        font-size: 11/375*100vw;
                        color: #666;
                    }
                }
            }
        }
    }
</style>

