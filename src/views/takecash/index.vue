<template>
    <div class="takecash">
        <bankcard></bankcard>
        <cashorder></cashorder>
    </div>
</template>

<script>
import bankcard from './components/bankcard'
import cashorder from './components/cashorder'
export default {
    name: 'takecash',
    data(){
        return{

        }
    },
    components: {
        bankcard,
        cashorder
    }
}
</script>

<style lang="scss" scoped>
   
</style>

