<template>
    <div class="ownertribeFoot">
        <ul>
            <li v-for="(item, index) in footData" :key="index + '_footData'">
                <div class="activity" v-if="item.type == 5">
                    <div class="head">
                        <div class="img">
                            <img :src="userMsg.userIcoUrl">
                            <span v-if="userMsg.userSex == 1">{{userMsg.userSex == 1 ? '♂' : '♀'}} {{userMsg.userAge}}</span>
                        </div>
                    </div>
                    <div class="main">
                        <img :src="item.picUrl">
                    </div>
                </div>
                <div class="video" v-if="item.type == 3">
                    <div class="head">
                        <video :src="item.videoUrl" controls="controls" poster=""></video>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props: {
        footData: Array,
        userMsg: Object
    }
}
</script>

<style lang="scss" scoped>
    .ownertribeFoot{
        margin: 0 12/375*100vw;
        box-shadow: 2/375*100vw 6/375*100vw 20/375*100vw 0 rgba(75,72,73,0.13);
        border-radius: 10/375*100vw;
        .activity{
            .head{
                img{
                    width: 44/375*100vw;
                    height: 44/375*100vw;
                    border-radius: 50%;
                }
            }
            .main{
                img{
                    width: 100%;
                    height: 175/375*100vw;
                }
            }
        }
        .video{
            .head{
                width: 100%;
                height: 175/375*100vw;
                video{
                    width: 100%;
                    height: 175/375*100vw;
                }
            }
        }
    }
</style>

