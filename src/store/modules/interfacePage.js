import Vue from 'vue'

const state = {
    url: '',
    oldFields: [],
    newFields: [],
    copyFields: [],
    translateTo: [],
    translateFrom: [],
    languages: [],
    errors: [],
    errorTemplate: [],
    textContent: [],
    itemId: null,
    isError: false,
    isAdd: false,
    changedFieldIds: [],
    interfaceGroup: []
}

const mutations = {
    setInterfaceGroup(state, interfaceGroup) {
        state.interfaceGroup = interfaceGroup
    },
    addChangedFieldId(state, id) {
        if (state.changedFieldIds.indexOf(id) === -1) state.changedFieldIds.push(id)
    },
    resetChangedFieldIds(state) {
        state.changedFieldIds = []
    },
    setIsAdd(state, isAdd) {
        state.isAdd = isAdd
    },
    setError(state, data) {
        state.errors[data.fieldId].hasError = data.flag
    },
    setUrl(state, url) {
        state.url = url
    },
    setItemId(state, id) {
        state.itemId = id
    },
    setTextContent(state, textContent) {
        state.textContent = textContent
    },
    setErrors(state, number) {
        let errors = []
        for (let i = 0; i < number; i++) {
            errors[i] = JSON.parse(JSON.stringify(state.errorTemplate))
        }
        state.errors = errors
    },
    setErrorTemplate(state, errorTemplate) {
        state.errorTemplate = errorTemplate
    },
    setNewFields(state, newFields) {
        state.newFields = newFields
    },
    setCopyFields(state, copyFields) {
        state.copyFields = copyFields
    },
    setTranslateTo(state, translateTo) {
        state.translateTo = translateTo
    },
    setOldFields(state, oldFields) {
        state.oldFields = oldFields
    },
    setTranslateFrom(state, language) {
        state.translateFrom = language
    },
    setLanguages(state, languages) {
        state.languages = languages
    },
    setIsError(state, flag) {
        state.isError = flag
    },
    checkFieldFilling(state) {
        let hasError = false
        for (let i = 0; i < state.errors.length; i++) {
            if (!state.newFields[i].value) {
                state.errors[i].hasError = true
                hasError = true
            } else {
                state.errors[i].hasError = false
            }
        }
        state.isError = hasError
    },
    resetErrors(state) {
        for (let key in state.errors) {
            if (state.errors.hasOwnProperty(key)) {
                state.errors[key].hasError = false
            }
        }
    },
    resetModule(state) {
        state.url = ''
        state.oldFields = []
        state.newFields = []
        state.copyFields = []
        state.translateTo = []
        state.translateFrom = []
        state.languages = []
        state.errors = []
        state.textContent = []
        state.itemId = null
        state.isError = false
        state.interfaceGroup = []
    }
}

const getters = {
    getParams(state) {
        let params = []
        for (let i = 0; i < state.newFields.length; i++) {
            // if (state.changedFieldIds.indexOf(state.newFields[i].id) !== -1 || !state.changedFields.length) {
                params.push({interface_entity_id: state.newFields[i].id, value: state.newFields[i].value})
            // }
        }
        return params
    }
}

const actions = {
    reset({state, commit}) {
        commit('setNewFields', JSON.parse(JSON.stringify(state.copyFields)))
    },
    addItem({state, commit, dispatch, rootGetters, getters}, params) {
        Vue.prototype.$http.post(
            state.url, params
        ).then(() => {
            dispatch('getFields', rootGetters.languageId)
            commit('setIsAdd', false)
            dispatch('notification/triggerSelfDismissingNotification', {
                message: state.textContent.addGreeting,
                isError: false
            }, {root: true})
        }).catch(error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
        })
    },
    edit({state, commit, dispatch, rootGetters, getters}) {
        // if (state.changedFieldIds.length) {
            commit('checkFieldFilling')
            if (!state.isError) {
                Vue.prototype.$http.put(
                    state.url + '/update',
                    {
                        translations: getters.getParams,
                        language_id: state.translateTo.id
                    }
                ).then(() => {
                    if (state.translateTo.id === rootGetters.languageId) {
                        commit('setOldFields', JSON.parse(JSON.stringify(state.newFields)))
                    }
                    commit('resetChangedFieldIds')
                    dispatch('notification/triggerSelfDismissingNotification', {
                        message: state.textContent.greeting,
                        isError: false
                    }, {root: true})
                }).catch(error => {
                    dispatch('notification/errorAxios', error.response.status, {root: true})
                })
            }
        // }
    },
    getFields({commit, state, dispatch, getters, rootGetters}, langId) {
        console.log(langId)
        Vue.prototype.$http.get(
            state.url + '?interface_group_id=' + state.itemId + '&language_id=' + langId
        ).then(response => {
            if (langId === rootGetters.languageId) {
                commit('setOldFields', JSON.parse(JSON.stringify(response.data.data)))
            }
                commit('setNewFields', response.data.data)

            // commit('setNewFields', response.data.data.length ? response.data.data : getters.emptyFields)
            // commit('setCopyFields', JSON.parse(JSON.stringify(state.newFields)))
            commit('setTranslateTo', response.data.language)
            commit('setErrors', state.newFields.length)
            commit('resetChangedFieldIds')
        }).catch(error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
        })
    },
    init({commit, dispatch, rootGetters}, data) {
        commit('setTextContent', data.textContent)
        commit('setUrl', rootGetters.apiUrl(data.apiUrlId))
        commit('setItemId', data.itemId)
        commit('setErrorTemplate', data.error)
        Vue.prototype.$http.get(
            state.url + '?interface_group_id=' + state.itemId + '&language_id=' + rootGetters.languageId
        ).then(response => {
            commit('setOldFields', response.data.data)
            commit('setNewFields', JSON.parse(JSON.stringify(response.data.data)))
            // commit('setCopyFields', JSON.parse(JSON.stringify(response.data.data)))
            commit('setTranslateTo', response.data.language)
            commit('setTranslateFrom', response.data.language)
            commit('setLanguages', response.data.languages)
            commit('setInterfaceGroup', response.data.interface_group)
            commit('setErrors', response.data.data.length)
        }, error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}