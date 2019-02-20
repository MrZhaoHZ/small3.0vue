<template>
    <div class="ac-map">
        <iframe id="mapPage" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></iframe>
    </div>
</template>

<script>
import { geocoder } from '@/http/api'
import { Toast, Indicator } from 'mint-ui';
export default {
    name: 'acmap',
    data(){
        return{
            
        }
    },
    created(){
        
    },
    mounted(){
        this.$nextTick(function(){
            let _this = this;
            window.addEventListener('message', function(event) {
                var loc = event.data;
                if(!event.data){
                    return false
                }
                console.log(loc)
                if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                    Indicator.open();
                    let param = {
                        location: loc.latlng.lat + ',' + loc.latlng.lng,
                        key: 'T2YBZ-FGZR4-SZQUE-XO5WB-T4D46-PEBG2'
                    }
                    geocoder(param).then( res => {
                        console.log(res);
                        if(res.code == 0){
                            Indicator.close();
                            _this.$router.push('/release/secondStep');
                            _this.$store.commit('secondStepAddress', {location: loc, district: JSON.parse(res.data).result.ad_info.district})
                            
                        }else{
                            Toast(res.msg)
                            Indicator.close();
                        }
                    }, err => {
                        console.log(err)
                    })
                }
            }, false);
        })
    }
}
</script>

<style lang="scss" scoped>
    .ac-map{
        #mapPage{
            position: fixed;
            width: 100%;
            height: 100%;
        }   
    }
</style>
