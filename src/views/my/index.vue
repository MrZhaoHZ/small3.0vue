<template>
    <div class="my">
        <div v-if="show">   
            <myhead v-on:changeIdentity="showIdentity"></myhead>
            <mybanner></mybanner>
            <mymain></mymain>
        </div>
        <div v-else>
            <ownerhead v-on:changeIdentity="showIdentity"></ownerhead>
            <ownerbanner></ownerbanner>
            <ownermain></ownermain>
        </div>
    </div>
</template>

<script>
import myhead from './components/myhead'
import mybanner from './components/mybanner'
import mymain from './components/mymain'
import ownerhead from './components/ownerhead'
import ownerbanner from './components/ownerbanner'
import ownermain from './components/ownermain'
export default {
    data(){
        return{
            show: true
        }
    },
    components: {
        myhead,
        mybanner,
        mymain,
        ownerhead,
        ownerbanner,
        ownermain
    },
    methods: {
        showIdentity(data){
            this.show = data
            if(this.show){
                document.title = '我的'
            }else{
                document.title = '我是盟主'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .my{
        width: 100%;
    }
</style>

