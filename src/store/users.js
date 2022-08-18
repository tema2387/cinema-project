import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    users: [],
})

export const mutations = {
    addUser(state, user) {
        state.users.push(user)
    },
}
