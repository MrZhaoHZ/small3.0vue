<template>
    <div class="tribelist">
        <tribelisthead></tribelisthead>
        <tribelistmain></tribelistmain>
    </div>
</template>

<script>
import tribelisthead from './components/head'
import tribelistmain from './components/main'
export default {
    data(){
        return{

        }
    },
    components: {
        tribelisthead,
        tribelistmain
    }
}
</script>

<style lang="scss" scoped>

</style>

