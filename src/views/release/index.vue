<template>
    <div class="release">
        <div class="line"></div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'release',
    data(){
        return{
           
        }
    },
    components: {
        
    },
    created(){
        // console.log(this.$store.state.release)
        // this.firstStep = this.$store.state.release.firstStep;
        // this.secondStep = this.$store.state.release.secondStep;
        // this.thirdStep = this.$store.state.release.thirdStep;
    }
}
</script>

<style lang="scss">
    html, body, #app{
        width: 100%;
        height: 100%;
    }
    .release{
        width: 100%;
        height: 100%;
        background: linear-gradient(#34CA8C , #FDFDFD 50vh);
        .line{
            height: 1px;
        }
    }
</style>

