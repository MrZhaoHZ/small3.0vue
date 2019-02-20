const state = {
    firstStep:{
        posterData: {
            cover_url: null,
            isOpacity: null,
        },
        titleData: {
            name: ''
        },
        typeData: {
            catalogId: 1,
            isSelect: 0
        }
    },
    secondStep: {
        descriptionData: {
            richtext: [],
        },
        timeData: {
            startDate: '开始时间',
            endDate: '结束时间'
        },
        numData: {
            num: '',
        },
        addressData: {
            location: null,
            district: null
        }
    },
    thirdStep: {
        ticketsData: {
            tickets: [],
        },
        acpublicData: {
            ispublic: '0'
        },
        informationData: {
            formList: [],
            allInformation: ['姓名', '电话', '年龄','地址','职业','邮箱']
        }
    }
}

const getters = {

}

const mutations = {
    // 第一步
    firstStepPoster(state, data){
        state.firstStep.posterData.cover_url = data.cover_url;
        state.firstStep.posterData.isOpacity = data.isOpacity;
    },
    firstStepTitle(state, data){
        state.firstStep.titleData.name = data.name;
    },
    firstStepType(state, data){
        state.firstStep.typeData.catalogId = data.catalogId;
        state.firstStep.typeData.isSelect = data.isSelect;
    },
    // 第二步
    secondStepDescription(state, data){
        state.secondStep.descriptionData.richtext = data.richtext
    },
    secondStepTime(state, data){
        state.secondStep.timeData.startDate = data.startDate;
        state.secondStep.timeData.endDate = data.endDate
    },
    secondStepNum(state, data){
        state.secondStep.numData.num = data.num
    },
    secondStepAddress(state, data){
        console.log(data);
        state.secondStep.addressData.location = data.location
        state.secondStep.addressData.district = data.district
    },
    // 第三步
    thirdStepTickets(state, data){
        state.thirdStep.ticketsData.tickets = data.tickets
    },
    thirdStepPublic(state, data){
        state.thirdStep.acpublicData.ispublic = data.ispublic
    },
    thirdStepInformation(state, data){
        state.thirdStep.informationData.formList = data.formList
        state.thirdStep.informationData.allInformation = data.allInformation
    }

}

const actions ={

}

export default {
    state,
    getters,
    mutations,
    actions
}