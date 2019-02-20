<template>
    <div class="mycollection">
        <mycollectionhead v-on:showCollection=showCollection></mycollectionhead>
        <activity v-if="show"></activity>
        <equipment v-else></equipment>
    </div>
</template>

<script>
import mycollectionhead from './components/mycollectionhead'
import activity from './components/activity'
import equipment from './components/equipment'
export default {
    name: 'mycollection',
    data(){
        return{
            show: true
        }
    },
    components:{
        mycollectionhead,
        activity,
        equipment
    },
    methods: {
        showCollection(data){
            this.show = data;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

