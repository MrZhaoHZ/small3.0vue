<template>
    <div class="attention">
        <attentionhead v-on:fansAttention = "fansAttention"></attentionhead>
        <attentionmain :id = "idNum"></attentionmain>
    </div>
</template>

<script>
import attentionhead from './components/attentionhead'
import attentionmain from './components/attentionmain'
export default {
    name: 'attention',
    data(){
        return{
            idNum: 1
        }
    },
    created(){
        console.log(this.$route)
        if(this.$route.query){
            this.idNum = Number(this.$route.query.id)
        }
    },
    components: {
        attentionhead,
        attentionmain
    },
    methods: {
        fansAttention(data){
            console.log(data);
            this.idNum = data;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

