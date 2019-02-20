<template>
    <div class="second-step">
        <description></description>
        <actime></actime>
        <acaddress></acaddress>
        <acpeople></acpeople>
        <btn></btn>
    </div>
</template>

<script>
import description from './components/description'
import actime from './components/time'
import acaddress from './components/address'
import acpeople from './components/acpeople'
import btn from './components/secondstep'
export default {
    data(){
        return{

        }
    },
    components: {
        description,
        actime,
        acaddress,
        acpeople,
        btn
    }
}
</script>

<style lang="scss" scoped>
    .second-step{
        position: relative;
        width: (310/375)*100vw;
        height: 93%;
        margin: 20/375*100vw auto;
        background: #fff;
        border-radius: 10/375*100vw;
        padding: 0 20/375*100vw;
    }
</style>

