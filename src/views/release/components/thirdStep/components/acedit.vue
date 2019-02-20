<template>
    <div class="acedit">
        <div class="btn" @click="release">发布</div>
        <phonebind :popupVisible="phonebindshow"></phonebind>
    </div>
</template>

<script>
import cookie from '@/lib/cookie.js'
import { addProductV2 } from '@/http/api'
import { Toast, Indicator } from 'mint-ui';
import phonebind from '../../../../../components/phonebinding'
export default {
    data(){
        return{
            phonebindshow: false,
            userId: null,
            fromList: [],
            ticket: null,
            district: null,
            product: {
                address: null, //地址
                area: null, //城市
                catalogId: null, //分类id
                coverUrl: null, //活动海报
                description: null,
                endDate: null, //活动结束时间
                equipmentPackageId: null, //方案id
                ispublic: null, //公开私密 0:公开 1:私密
                longLatitude: null, //经纬度
                name: null, //活动名称
                productId: null,
                startDate: null, //活动开始时间
                status: null,
                sumPeople: null, //活动人数
                equipmentId: null, //装备id
                district: null, //区
                source: 2, //发布类型
            }
        }
    },
    created(){
        this.userId = cookie.getCookie('userId');
    },
    components:{
        phonebind
    },
    methods: {
        release(){
            if(this.userId == 'undefined' || this.userId == ''){
                this.phonebindshow = true;
            }
            Indicator.open();
            this.product = {
                address: this.$store.state.release.secondStep.addressData.location.poiaddress,
                area: this.$store.state.release.secondStep.addressData.location.cityname,
                catalogId: this.$store.state.release.firstStep.typeData.catalogId,
                coverUrl: this.$store.state.release.firstStep.posterData.cover_url,
                description: JSON.stringify(this.$store.state.release.secondStep.descriptionData.richtext),
                endDate: this.$store.state.release.secondStep.timeData.endDate,
                equipmentPackageId: null,
                ispublic: this.$store.state.release.thirdStep.acpublicData.ispublic,
                longLatitude: this.$store.state.release.secondStep.addressData.location.latlng.lat + ',' + this.$store.state.release.secondStep.addressData.location.latlng.lng,
                name: this.$store.state.release.firstStep.titleData.name,
                // productId: ,''
                startDate: this.$store.state.release.secondStep.timeData.startDate,
                // status: '',
                sumPeople: this.$store.state.release.secondStep.numData.num,
                // equipmentId: '',
                district: this.$store.state.release.secondStep.addressData.district,
                source: 2,
            }
            console.log(this.product);
            this.fromList = [];
            for(let i = 0; i < this.$store.state.release.thirdStep.informationData.formList.length; i++){
                this.fromList.push({
                    fieldName: this.$store.state.release.thirdStep.informationData.formList[i]
                })
            }
            this.ticket = this.$store.state.release.thirdStep.ticketsData.tickets
            let paramData = {
                ticket: this.ticket,
                fromList: this.fromList,
                product: this.product,
                userId: this.userId
            }
            addProductV2(paramData).then(res => {
                Indicator.close();
                if(res.code == 0){
                    this.$router.push({
                        path: '/blankpage',
                        query: {
                            id: 0
                        }
                    });
                }else{
                    Toast(res.msg)
                }
            }, err => {
                Indicator.close();
                console.log(err);
            })

        }
    }
}
</script>

<style lang="scss" scoped>
    .acedit{
        margin-top: 60/375*100vw;
        padding-bottom: 100/375*100vw;
        .btn{
            margin: 0 auto;
            width: 310/375*100vw;
            height: 56/375*100vw;
            background: linear-gradient(to right, #79E9AC , #34CA8C);
            border-radius: 6/375*100vw;
            color: #fff;
            text-align: center;
            line-height: 56/375*100vw;
        }
    }
</style>

