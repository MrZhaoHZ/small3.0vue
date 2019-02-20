<template>
<div class="newhomeBox">
    <div class="hHeader">
        <ul>
            <li v-for="(item, index) in headerArray" :class="item.status == 1 ? 'current' : ''" @click="setCurrent">{{item.name}}</li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      headerArray:[
        {
          name:'我的关注',
          status:1
        },
        {
          name:'精选',
          status:0
        },
        {
          name:'即将开始',
          status:0
        }
      ]
    }
  },
  methods: {
    setCurren(e){
      console.log(e)
    }
  },
};
</script>
<style lang="scss" scoped>

.newhomeBox{
  font-size: 0.16rem;
    .hHeader{
        ul{
          padding-left: 0.19rem;
          box-shadow:0 0.04rem 0.46rem 0 rgba(75, 72, 73, .12);

            li{
              height: 0.39rem;
              line-height: 0.39rem;
              margin-right: 0.3rem;
              display: inline-block;
              color: #858585;
            }
            .current{
              border-bottom: 3px solid #4ED698;
              color: #333;
              font-weight: 600;
            }
        }
    }

}

</style>
