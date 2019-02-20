<template>
    <div class="createtribe">
        <createtribeHead></createtribeHead>
        <createTribeMain></createTribeMain>
        <createTribeFoot></createTribeFoot>
    </div>
</template>

<script>
import createtribeHead from './components/head'
import createTribeMain from './components/main'
import createTribeFoot from './components/foot'
export default {
    name: 'createtribe',
    data(){
        return{

        }
    },
    components: {
        createtribeHead,
        createTribeMain,
        createTribeFoot
    }
}
</script>

<style lang="scss" scoped>

</style>
