<template>
    <div class="home">
        <homehead></homehead>
        <router-view/>
    </div>
</template>

<script>
import homehead from './components/homehead'
export default {
    name: 'home',
    data(){
        return{
            
        }  
    },
    components: {
        homehead
    }
}
</script>

<style lang="scss" scoped>
   
</style>

