<template>
    <div class="find">
        <findhead v-on:choose="getChooseData"></findhead>
        <findmain :mainData = "data" :isChange = "change"></findmain>
    </div>
</template>

<script>
import findhead from './components/head'
import findmain from './components/main'
export default {
    name: 'find',
    data(){
        return{
            data: null,
            change: true
        }
    },
    components: {
        findhead,
        findmain
    },
    methods: {
        getChooseData(data){
            console.log(data)
            if(this.change){
                this.change = false
            }else{
                this.change = true
            }
            this.data = data;
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
