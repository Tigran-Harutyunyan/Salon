import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: { 
        data : {},
        userInfo: {}
    },
    getters: {
        appData: state => state.data,
        getUserInfo: state => state.userInfo
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload;
        },
        SET_USER_INFO(state, payload) {
            state.userInfo = payload;
        }  
    },
    actions: {
        setData({ commit }, payload) {
            commit('SET_DATA',payload)
        },
        setUserInfo({ commit }, payload) {
            commit('SET_USER_INFO',payload)
        }  
    }
})