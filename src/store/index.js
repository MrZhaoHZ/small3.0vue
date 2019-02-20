import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user.js'
import release from './modules/release.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        release
    }
})