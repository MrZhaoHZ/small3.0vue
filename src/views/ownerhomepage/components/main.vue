<template>
    <div class="ownerhomemain">
        <ul>
            <li v-for="(item, index) in navData" :key="index + '_navData'" :class="{'liSelect' : index == isSelect}" @click="selectType(item, index)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            navData: [{name: '全部', id: 0}, {name: '活动', id: 1}, {name: '视频', id: 2}],
            isSelect: 0
        }
    },
    created(){

    },
    methods: {
        selectType(item, index){
            this.isSelect = index;
            if(item.id == 0){
                this.$emit('selectType', 1)
            }else if(item.id == 1){
                this.$emit('selectType', 2)
            }else{
                this.$emit('selectType', 3)
            }   
        }
    }
}
</script>

<style lang="scss" scoped>
    .ownerhomemain{
        ul{
            width: 100%;
            height: 46/375*100vw;
            box-shadow: 0 2/375*100vw 4/375*100vw 0 rgba(0,0,0,0.08);
            li{
                display: inline-block;
                margin-left: 32/375*100vw;
                height: 46/375*100vw;
                line-height: 46/375*100vw;
                box-sizing: border-box;
            }
            .liSelect{
                border-bottom: 2/375*100vw solid #000;
            }
        }
    }
</style>
