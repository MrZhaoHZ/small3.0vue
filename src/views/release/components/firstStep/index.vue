<template>
    <div class="first-step">
        <!-- <poster v-on:posterData="getPosterData"></poster>
        <type v-on:typeData="getTypeData"></type>
        <tit v-on:titleData="getTitleData"></tit> -->
        <poster></poster>
        <type></type>
        <tit></tit>
        <btn></btn>
    </div>
</template>

<script>
import poster from './components/poster'
import type from './components/type'
import tit from './components/title'
import btn from './components/nextstep'
export default {
    name: 'firstStep',
    data(){
        return{
            // cover_url: null, //海报地址
            // catalogId: 1, //活动类型id
            // name: '', //活动名称
        }
    },
    props: [
        // cover_url, catalogId, name
    ],
    components: {
        poster,
        type,
        tit,
        btn
    },
    methods: {
        // getPosterData(data){
        //     this.cover_url = data;
        // },
        // getTypeData(data){
        //     this.catalogId = data;
        //     console.log(data);
        // },
        // getTitleData(data){
        //     this.name = data;
        //     console.log(this.name);
        // }
    }
}
</script>

<style lang="scss" scoped>
    .first-step{
        position: relative;
        width: (310/375)*100vw;
        min-height: 90%;
        margin: 20/375*100vw auto;
        background: #fff;
        border-radius: 10/375*100vw;
        padding: 0 20/375*100vw;
    }
</style>

