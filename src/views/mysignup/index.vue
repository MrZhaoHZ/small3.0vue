<template>
    <div class="signup">
        <navlist v-on:select = select></navlist>
        <list :statusData = getStatus></list>
    </div>
</template>

<script>
import navlist from './components/nav'
import list from './components/list'
export default {
    name: 'mysignup',
    data(){
        return{
           getStatus: '',  
        }
    },
    components: {
        navlist,
        list
    },
    methods: {
        select(data){
            // console.log(data)
            this.getStatus = data
        }
    }
}
</script>

<style>

</style>
