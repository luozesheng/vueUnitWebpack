import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let state = {
    
};
let types = {

};
let mutations = {
    //导航路由缓存
    // [types.ROUTER_URL](state, payload) {
    //     state.router_url = payload;
    // },
};
let actions = {
    getCommonMenuList({ commit }, payload) {
        // request.getCommonMenu(res => {
        //     commit(types.COMMON_MENULIST, res);
        // }, payload.params);
    },
}
export default new Vuex.Store({
    state: state,
    modules: {
        
    },
    mutations: mutations,
    actions: actions
})