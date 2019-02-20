<template>
    <div class="choice">
        <banner></banner>
        <navbar></navbar>
        <talent></talent>
        <recommend></recommend>
    </div>
</template>

<script>
import banner from './components/banner'
import navbar from './components/navbar'
import talent from './components/talent'
import recommend from './components/recommend'
export default {
    name: 'choice',
    data(){
        return{
            
        }
    },
    components: {
        banner,
        navbar,
        talent,
        recommend
    }
}
</script>

<style lang="scss" scoped>
    // .choice{
        
    // }
</style>

