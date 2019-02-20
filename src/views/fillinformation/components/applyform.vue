<template>
    <div class="form">
        <ul class="list">
            <li v-for="(item, index) in applyForm" :key="index+'_applyForm'">
                <p>{{item.fieldName}}</p>
                <div>
                    <input type="text" v-model="item.field_value" @blur="sendData">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            applyForm: []
        }
    },
    props: {
        formData: Object
    },
    created(){
        for(let i = 0, len = this.$props.formData.applyForm.length; i < len; i++){
            this.applyForm.push({
                form_id: this.$props.formData.applyForm[i].id,
                field_value: null,
                fieldName: this.$props.formData.applyForm[i].fieldName
            })
        }
    },
    methods: {
        sendData(){
            this.$emit('sendApplyForm', this.applyForm)
        }
    },
    watch: {
        applyForm: function(oldval, newavl){
            this.$emit('sendApplyForm', this.applyForm)
        }
    }
}
</script>

<style lang="scss" scoped>
    .form{
        padding: 27/375*100vw 18/375*100vw;
        .list{
            p{
                color: rgba(113,117,126,1);
                font-size: 13/375*100vw;
                margin-bottom: 10/375*100vw;
            }
            div{
                padding: 10/375*100vw 20/375*100vw;
                border: 1/375*100vw solid rgba(154,157,163,1);
                border-radius: 4/375*100vw;
                margin-bottom: 24/375*100vw;
                input{
                    width: 100%;
                    outline: none;
                    border: none;
                    font-size: 13/375*100vw;
                    caret-color:#52D89A; 
				    -webkit-tap-highlight-color:rgba(0,0,0,0);
                }
            }
        }
    }
</style>

