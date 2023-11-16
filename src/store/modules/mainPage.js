import Vue from 'vue'
import router from '../../router'

const state = {
    items: {},
    meta: [],
    links: [],
    isAdd: false,
    currentNumber: 10,
    fields: [],
    initFields: [],
    isError: false,
    stringParams: '',
    sharedParams: [],
    sortingParams: [],
    paginationParams: [],
    url: '',
    textContent: [],
    filterItems: [],
    tabs: [],
    tabDisabled: true,
    currentTabId: 0,
    filterParams: [],
    fileExtensions: [],
    emptyData: false
}

const mutations = {
    setFileExtensions(state, fileExtensions) {
        state.fileExtensions = fileExtensions
    },
    setFilterParams(state, filterParams) {
        state.filterParams = filterParams
    },
    setPaginationParams(state, paginationParams) {
        state.paginationParams = paginationParams
    },
    setSortingParams(state, sortingParams) {
        state.sortingParams = sortingParams
    },
    setSharedParams(state, sharedParams) {
        state.sharedParams = sharedParams
    },
    setTabs(state, tabs) {
        state.tabs = tabs
    },
    setTabDisabled(state, flag) {
        state.tabDisabled = flag
    },
    setFilterItem(state, data) {
        state.filterItems[data.filterId] = data.item
    },
    setFilterItems(state, filterItems) {
        state.filterItems = filterItems
    },
    setTextContent(state, textContent) {
        state.textContent = textContent
    },
    setCurrentNumber(state, currentNumber) {
        state.currentNumber = currentNumber
    },
    setItems(state, items) {
        state.items = items
    },
    setLinks(state, links) {
        state.links = links
    },
    setMeta(state, meta) {
        state.meta = meta
    },
    setIsAdd(state, flag) {
        state.isAdd = flag
    },
    setInitFields(state, fields) {
        state.initFields = fields
    },
    setFields(state, fields) {
        state.fields = fields
    },
    setUrl(state, url) {
        state.url = url
    },
    setField(state, data) {
        state.fields[data.fieldId][data.fieldPropertyId] = data.value
    },
    checkFile(state, data) {
        if (state.fileExtensions[data.name].indexOf(data.fileName.split('.').pop()) === -1) {
            state.fields[data.name].errorId = 'extension'
            state.isError = true
        } else {
            state.fields[data.name].errorId = null
            state.isError = false
        }
    },
    checkFieldFilling(state) {
        let isError = false
        for (let key in state.fields) {
            if (state.fields.hasOwnProperty(key) && state.fields[key].tabId === state.currentTabId) {
                if (state.fields[key].value !== '') {
                  switch (state.fields[key].validation) {
                    case 'email':
                      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (re.test(String(state.fields[key].value).toLowerCase())) {
                        state.fields[key].errorId = null
                      } else {
                        state.fields[key].errorId = 'email'
                        isError = true
                      }
                      break
                    case 'phone':
                      if (state.fields[key].value.length > 8 && state.fields[key].value.length < 16) {
                        state.fields[key].errorId = null
                      } else {
                        state.fields[key].errorId = 'phone'
                        isError = true
                      }
                      break
                    default:
                      state.fields[key].errorId = null
                  }
                } else {
                    if (!state.fields[key].isNullable) {
                        state.fields[key].errorId = 'empty'
                        isError = true
                    }
                }
            }
        }
        state.isError = isError
    },
    setCurrentTabId(state, id) {
        state.currentTabId = id
    },
    setTabFilledIn(state, flag) {
        state.tabs[state.currentTabId].isFilledIn = flag
    },
    resetModule(state) {
        state.items = {}
        state.meta = []
        state.links = []
        state.isAdd = false
        state.currentNumber = 10
        state.fields = []
        state.initFields = []
        state.stringParams = ''
        state.isError = false
        state.params = []
        state.url = ''
        state.textContent = []
        state.filterItems = []
    }
}

const getters = {
    formattedParameters(state) {
        let formattedParameters = {}
        for (let key in state.fields) {
            if (state.fields.hasOwnProperty(key)) {
                formattedParameters[state.fields[key].parameterName] = state.fields[key].value
            }
        }
        return formattedParameters
    },
    countItems(state) {
        return state.items.length
    },
    paramsToString(state) {
        let result = '?'
        let params = state.paginationParams.concat(state.sortingParams, state.sharedParams)
        for (let i = 0; i < params.length; i++) {
            if (params[i].value) {
                result += params[i].name + '=' + params[i].value + '&'
            }
        }
        return result.substring(0, result.length - 1)
    },
    isLastTab(state) {
        return (state.tabs.length - 1) === state.currentTabId
    },
}

const actions = {
    checkTabAwailability({ state, commit }) {
        setTimeout(() => {
            commit('setTabDisabled', false)
            for (let key in state.fields) {
                state.isError = false
                state.fields[key].errorId = null
                if (state.fields.hasOwnProperty(key)
                    && state.fields[key].tabId === state.currentTabId
                    && (state.fields[key].parameterName != 'text'
                        && state.fields[key].parameterName != 'right_text'
                        && state.fields[key].parameterName != 'left_text')) {
                    if (state.fields[key].value == '') {
                        commit('setTabDisabled', true)
                    }
                }
            }
        }, 500)
    },
    initFields({commit}, fields) {
        commit('setInitFields', fields)
        commit('setFields', JSON.parse(JSON.stringify(fields)))
    },
    getItems({state, commit, getters, dispatch}) {
        state.emptyData = false;
        Vue.prototype.$http.get(
            state.url + getters.paramsToString
        ).then(response => {
            commit('setItems', response.data.data)
            commit('setMeta', response.data.meta ? response.data.meta : [])
            commit('setLinks', response.data.links)
            response.data.data.length ? state.emptyData = false : state.emptyData = true;
        }).catch(error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
            state.emptyData = true
        })
    },
    toggleItem({state, dispatch}, data) {
        Vue.prototype.$http.put(
            state.url + '/' + data.id + '/field',
            {
                'field': 'is_active',
                'value': !data.isActive
            }
        ).catch(error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
        })
    },
    onAddItem(context) {
        context.commit('setIsAdd', true)
    },
    onEditItem({state}, id) {
      console.log(router.currentRoute.path + '/' + id)
        router.push(router.currentRoute.path + '/' + id)
    },
    readItem({state}, id) {
        router.push('/feedback/' + id)
    },
    testAndDeleteItem({dispatch, state}, data) {
        Vue.prototype.$http.get(
            data.url
        ).then(response => {
            if (response.data.data.length) {
                dispatch('notification/triggerSelfDismissingNotification', {
                    message: state.textContent.deleteError,
                    isError: true
                }, {root: true})
            } else {
                dispatch('deleteItem', data.id)
            }
        }).catch(error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
        })
    },
    deleteItem({commit, state, dispatch}, id) {
        Vue.prototype.$http.delete(
            state.url + '/' + id
        ).then(() => {
            let currentPage = state.meta.current_page
            if (state.meta.from === state.meta.to && state.meta.from !== 1) {
                currentPage = currentPage - 1
            }
            commit('setPaginationParams', [{name: 'page', value: currentPage}, {name: 'number', value: state.currentNumber}])
            dispatch('getItems')
            dispatch('notification/triggerSelfDismissingNotification', {
                message: state.textContent.deleteGreeting,
                isError: false
            }, {root: true})
        }).catch(error => {
            dispatch('notification/errorAxios', error.response.status, {root: true})
        })
    },
    addItem({commit, state, dispatch, getters}) {
        commit('checkFieldFilling')
      // console.log(state.isError)
      // console.log(getters.formattedParameters)
        if (!state.isError) {
            Vue.prototype.$http.post(
                state.url, getters.formattedParameters
            ).then(() => {
                commit('setPaginationParams', [{name: 'page', value: 1}, {name: 'number', value: state.currentNumber}])
                dispatch('getItems')
                dispatch('modalClose')
                dispatch('notification/triggerSelfDismissingNotification', {
                    message: state.textContent.addGreeting,
                    isError: false
                }, {root: true})
            }).catch(error => {
                dispatch('notification/errorAxios', error.response.status, {root: true})
            })
        }
    },
    modalClose({commit}) {
        commit('setIsAdd', false)
    },
    onNext({commit, state}) {
        commit('checkFieldFilling')
        if (!state.isError) {
            commit('setTabFilledIn', true)
            commit('setCurrentTabId', ++state.currentTabId)
        }
    },
    onPrev({commit, state, dispatch}) {
        commit('setCurrentTabId', --state.currentTabId)
        commit('setTabFilledIn', false)
        dispatch('checkTabAwailability')
    },
    onSearch({commit, state, getters, dispatch}, request) {
        commit('setPaginationParams', [{name: 'page', value: 1}, {name: 'number', value: state.currentNumber}])
        Vue.prototype.$http.get(
            state.url + '/search?value=' + request
        ).then(response => {
            if (!response.data.data.length) {
                state.emptyData = true
            } else {
                state.emptyData = false
                commit('setItems', response.data.data)
                commit('setMeta', response.data.meta)
                commit('setLinks', response.data.links)
            }
        }).catch(error => {
            state.emptyData = true
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
