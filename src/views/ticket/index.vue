<template>
    <div class="ticket">
        <div class="line"></div>
        <addticket></addticket>
    </div>
</template>

<script>
import addticket from './components/addTicket'
export default {
    data(){
        return{

        }
    },
    components: {
        addticket
    }
}
</script>

<style lang="scss">
    html, body, #app{
        width: 100%;
        height: 100%;
    }
    .ticket{
        width: 100%;
        height: 100%;
        background: linear-gradient(#34CA8C , #FDFDFD 50vh);
        .line{
            height: 1px;
        }
    }
</style>
