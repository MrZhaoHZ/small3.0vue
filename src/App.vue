<template>
    <div id="app">
        <router-view/>
        <tabbar v-if="$route.meta.tabbar"></tabbar>
    </div>
</template>

<script>
import tabbar from './views/tabbar/index'
export default {
    name: "App",
    components: {
        tabbar
    }
};
</script>

<style lang="scss" scoped>
   
</style>

