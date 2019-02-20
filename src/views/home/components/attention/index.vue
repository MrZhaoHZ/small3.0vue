<template>
    <div class="attention">
        <!-- 我的关注 -->
        <attentionList></attentionList>
    </div>
</template>

<script>
import attentionList from './components/list'
export default {
    name: 'attention',
    data(){
        return {
            
        }
    },
    components: {
        attentionList
    }
}
</script>

<style lang="scss" scoped>
    // .attention{
        
    // }
</style>

