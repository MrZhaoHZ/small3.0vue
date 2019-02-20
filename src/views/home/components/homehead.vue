<template>
    <div class="homehead">
        <nav class="navbar">
            <span v-for="(item, index) in navlist" :key="index + '_navlist'" :class="['navItem', {'navItemChoose': index == isSelect}]" @click="selectNav(item, index)">
                {{item.name}}
            </span>
            <p></p>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            navlist: [{id: 0, name: '我的关注'}, {id: 1, name: '精选'}, {id: 2, name: '即将开始'}],
            isSelect: 1
        }   
    },
    created(){
        if(this.$route.name == 'attention'){
            this.isSelect = 0;
        }else if(this.$route.name == 'choice'){
            this.isSelect = 1;
        }else{
            this.isSelect = 2;
        }
    },
    methods: {
        selectNav(item, index){
            this.isSelect = index;
            if(item.id == 0){
                this.$router.push('/home/attention')
            }else if(item.id == 1){
                this.$router.push('/home/choice')
            }else{
                this.$router.push('/home/tostart')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .homehead{
        width: 100%;
        height: 40/375*100vw;
        line-height: 40/375*100vw;
        box-shadow: 0 2/375*100vw 4/375*100vw 0 rgba(0,0,0,0.08);
        .navbar{
            margin: 0 19/375*100vw;
            .navItem{
                display: inline-block;
                margin-right: 32/375*100vw;
                font-size: 16/375*100vw;
                color: rgba(51, 51, 51, 1);
            }
            .navItemChoose{
                border-bottom: 2/375*100vw solid #34CA8C;
                font-weight: 500;
                color: #000;
                box-sizing: border-box;
            }
        }
    }
</style>

