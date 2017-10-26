import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: { 
        incomingData : {}
    },
    getters: {
        menues: state => state.menus,
    },
    mutations: {
        SET_DATA(state, payload) {
            state.incomingData = payload;
        } 
    },
    actions: {
        setData({ commit }, payload) {
            commit('SET_DATA',payload)
        } 
    }
})