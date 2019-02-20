<template>
    <div class="uploadphotos">
        <uploadphotosHead></uploadphotosHead>
        <uploadphotosMain></uploadphotosMain>
    </div>
</template>

<script>
import uploadphotosHead from './components/head'
import uploadphotosMain from './components/main'
export default {
    name: 'uploadphotos',
    components: {
        uploadphotosHead,
        uploadphotosMain
    }
}
</script>

<style lang="scss" scoped>

</style>

