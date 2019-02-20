<template>
    <div class="tostart">
        <comingsoon></comingsoon>
    </div>
</template>

<script>
import comingsoon from './components/comingsoon'
export default {
    name: 'tostart',
    data(){
        return{
            
        }
    },
    components: {
        comingsoon
    }
}
</script>

<style lang="scss" scoped>
    .tostart{
        overflow: scroll;
        height: 100%;
    }
</style>

