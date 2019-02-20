<template>
    <div class="third-step">
        <information></information>
        <ticket></ticket>
        <acpublic></acpublic>
        <acedit></acedit>
    </div>
</template>

<script>
import information from './components/information'
import ticket from './components/ticketsetting'
import acpublic from './components/acpublic'
import acedit from './components/acedit'
export default {
    data(){
        return{

        }
    },
    components: {
        information,
        ticket,
        acpublic,
        acedit
    }
}
</script>

<style lang="scss" scoped>
    .third-step{
        position: relative;
        width: (310/375)*100vw;
        height: 93%;
        margin: 20/375*100vw auto;
        background: #fff;
        border-radius: 10/375*100vw;
        padding: 0 20/375*100vw;
        h3{
            display: inline;
        }
    }
</style>
