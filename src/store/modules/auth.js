/* global localStorage */

import User from '@/models/User'

export default {
    namespaced: true,
    state: {
        user: User.from(localStorage.token)
    },
    mutations: {
        userLogin(state) {
            state.user = User.from(localStorage.token)
        },
        userLogout(state) {
            state.user = null
        }
    },
    getters: {
        currentUser(state) {
            return state.user
        }
    },
    actions: {
        login({commit}) {
            commit('userLogin')
        },
        logout({commit}) {
            commit('userLogout')
        }
    }
}
