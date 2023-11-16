import router from '../../router'

export default {
    namespaced: true,
    state: {
        message: '',
        showGreeting: false,
        isError: false
    },
    mutations: {
        setMessage(state, message) {
            state.message = message
        },
        setIsError(state, flag) {
            state.isError = flag
        },
        setShowGreeting(state, flag) {
            state.showGreeting = flag
        }
    },
    actions: {
        triggerSelfDismissingNotification({commit}, data) {
            commit('setMessage', data.message)
            commit('setShowGreeting', true)
            commit('setIsError', data.isError)
            setTimeout(function () {
                commit('setShowGreeting', false)
            }, 6000)
        },
        errorAxios({commit, dispatch}, status) {
            if (status === 401) {
                delete localStorage.token
                dispatch('auth/logout', {}, {root: true})
                router.push('/login')
            } else {
                if (status === 409) {
                    dispatch('triggerSelfDismissingNotification', {message: 'Элемент уже существует', isError: true})
                } else {
                    dispatch('triggerSelfDismissingNotification', {message: 'Возникла ошибка при выполнении', isError: true})
                }
            }
        }
    }
}