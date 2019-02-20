<template>
    <div class="nav">
        <ul>
            <li v-for="(item, index) in listData" :key="index + '_listData'" :class="['list', {'listSelect' : index == isSelect}]" @click="select(item, index)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            listData: [{name: '全部', id: ''}, {name: '待参加', id: '2'}, {name: '待审核', id: '1'}, {name: '待支付', id: '11'}, {name: '待退票', id: '3'}],
            isSelect: 0
        }
    },
    methods: {
        select(item, index){
            this.isSelect = index
            this.$emit('select', item.id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav{
        ul{
            font-size: 0;
            margin: 0 18/375*100vw;
            height: 57/375*100vw;
            .list{
                display: inline-block;
                width: 20%;
                height: 57/375*100vw;
                font-size: 14/375*100vw;
                text-align: center;
                line-height: 57/375*100vw;
            }
            .listSelect{
                color:  #52D89A;
                border-bottom: 2/375*100vw solid #52D89A;
                box-sizing: border-box;
            }
        }
    }
</style>

