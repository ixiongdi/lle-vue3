import {createStore} from 'vuex'

export default createStore({
    state: {
        menus: []
    },
    mutations: {
        setMenus(state, menus) {
            state.menus = menus;
        }
    },
    actions: {},
    modules: {}
})
