import Vue from 'vue'

const state = {
    url: '',
    oldFields: [],
    newFields: [],
    copyFields: [],
    translateTo: [],
    translateFrom: [],
    commonFields: [],
    languages: [],
    errors: [],
    textContent: [],
    isLoaded: false,
    itemId: null,
    isError: false,
    filterParams: [],
    fileExtensions: []
}

const mutations = {
    setFileExtensions(state, fileExtensions) {
        state.fileExtensions = fileExtensions
    },
    setFilterParams(state, filterParams) {
        state.filterParams = filterParams
    },
    setCommonField(state, data) {
        state.commonFields[data.fieldId] = data.value
    },
    setCommonFieldFileUrl(state, data) {
        state.commonFields[data.fieldId].url = data.url
    },
    setCommonFieldFileName(state, data) {
        state.commonFields[data.fieldId].name = data.name
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
    setErrors(state, errors) {
        state.errors = errors
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
    setIsLoaded(state, isLoaded) {
        state.isLoaded = isLoaded
    },
    setIsError(state, flag) {
        state.isError = flag
    },
    setCommonFields(state, commonFields) {
        state.commonFields = commonFields
    },
    checkFile(state, data) {
        if (state.fileExtensions[data.name].indexOf(data.fileName.split('.').pop()) === -1) {
            state.errors[data.name].hasError = true
            state.isError = true
        } else {
            state.errors[data.name].hasError = false
            state.isError = false
        }
    },
    checkFieldFilling(state) {
        let hasError = false
        for (let key in state.newFields) {
            if (state.newFields.hasOwnProperty(key) && state.errors.hasOwnProperty(key)) {
                if (!state.newFields[key] && !state.errors[key].isNullable) {
                    state.errors[key].hasError = true
                    hasError = true
                } else {
                    state.errors[key].hasError = false
                }
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
        state.commonFields = []
        state.languages = []
        state.errors = []
        state.textContent = []
        state.isLoaded = false
        state.itemId = null
        state.isError = false
    }
}

const actions = {
    reset({state, commit}) {
        commit('setNewFields', JSON.parse(JSON.stringify(state.copyFields)))
    },
    edit({state, commit, dispatch, rootGetters}, params) {
        commit('checkFieldFilling')
        if (!state.isError) {
            Vue.prototype.$http.put(
                state.url + '/' + state.itemId,
                params
            ).then(() => {
                if (state.translateTo.id === rootGetters.languageId) {
                    commit('setOldFields', JSON.parse(JSON.stringify(state.newFields)))
                }
                dispatch('notification/triggerSelfDismissingNotification', {
                    message: state.textContent.greeting,
                    isError: false
                }, {root: true})
            }).catch(error => {
                dispatch('notification/errorAxios', error.response.status, {root: true})
            })
        }
    },
    getFields({commit, state, dispatch}, langId) {
        return new Promise((resolve) => {
            Vue.prototype.$http.get(
                state.url + '/' + state.itemId + '/edit?language_id=' + langId
            ).then(response => {
                commit('setNewFields', response.data.data)
                commit('setCopyFields', JSON.parse(JSON.stringify(response.data.data)))
                commit('setTranslateTo', response.data.language)
                commit('resetErrors')
                resolve(response);
            }).catch(error => {
                dispatch('notification/errorAxios', error.response.status, {root: true})
            })
        })
    },
    init({commit, dispatch, rootGetters}, data) {
        commit('setCommonFields', data.commonFields)
        commit('setTextContent', data.textContent)
        commit('setUrl', rootGetters.apiUrl(data.apiUrlId))
        commit('setErrors', data.errors)
        commit('setItemId', data.itemId)
        return new Promise((resolve) => {
            Vue.prototype.$http.get(
                state.url + '/' + state.itemId + '/edit?language_id=' + rootGetters.languageId
            ).then(response => {
                commit('setOldFields', response.data.data)
                commit('setNewFields', JSON.parse(JSON.stringify(response.data.data)))
                commit('setCopyFields', JSON.parse(JSON.stringify(response.data.data)))
                commit('setTranslateTo', response.data.language)
                commit('setTranslateFrom', response.data.language)
                commit('setLanguages', response.data.languages)
                commit('setIsLoaded', true)
                resolve(response);
            }, error => {
                dispatch('notification/errorAxios', error.response.status, {root: true})
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

