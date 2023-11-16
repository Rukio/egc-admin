import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import mainPage from './modules/mainPage'
import editPage from './modules/editPage'
import notification from './modules/notification'
import interfacePage from './modules/interfacePage'
import interfaceText from './modules/interfaceText'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiDomain: 'http://api.egc.fi', // localhost:8000  api.egc.fi
        siteUrl: 'http://www.egc.fi/ru',
        ckfinderUrl: '/api/uploadCKEditorImage',
        numberOfItems: 10,
        unreadMessages: 0,
        showHeaderPopup: false,
        menuDesktopShow: false,
        menuMobileShow: false,
        showModal: false,
        itemForDelete: {},
        language: {
            id: 1,
            name: 'ru'
        },
        apiUrls: {
            interface: '/api/interface',
            interfaceGroups: '/api/interfaceGroup',
            articleCategories: '/api/articleCategory',
            portfolioCategories: '/api/portfolioCategory',
            portfolioProjects: '/api/portfolioArticle',
            authors: '/api/articleAuthor',
            articles: '/api/article',
            feedback: '/api/feedback',
            servicesCategories: '/api/serviceCategory',
            servicesServices: '/api/service',
            clients: '/api/clients',
            contacts: '/api/contact',
            vacancies: '/api/vacancy',
            languages: '/api/languages',
            messengers: '/api/messengers',
            pages: '/api/page',
            text: '/api/text',
            questionnaire: '/api/questionnaire'
        }
    },
    mutations: {
        setShowModal(state, flag) {
            state.showModal = flag
        },
        setItemForDelete(state, item) {
            state.itemForDelete = item
        },
        decreaseUnreadMessages(state) {
            state.unreadMessages--
        },
        setUnreadMessages(state, unreadMessages) {
            state.unreadMessages = unreadMessages
        },
        toggleHeaderPopup(state) {
            state.showHeaderPopup = !state.showHeaderPopup
        },
        hideHeaderPopup(state) {
            state.showHeaderPopup = false
        },
        showMenuDesktop(state, flag) {
            state.menuDesktopShow = flag
        },
        toggleMenuMobile(state) {
            state.menuMobileShow = !state.menuMobileShow;
        },
        showMenuMobile(state, flag) {
            state.menuMobileShow = flag;
        }
        // hideMenu(state) {
        //     if(document.documentElement.clientWidth < 1200) {
        //         state.isHiddenMenu = true
        //     }
        // },
        // toggleMenu(state) {
        //     state.isHiddenMenu = !state.isHiddenMenu
        // },
    },
    getters: {
        languageId(state) {
            return state.language.id
        },
        apiUrl: state => apiUrlId => {
            return state.apiUrls[apiUrlId]
        }
    },
    actions: {
        toggleMenu({ state, commit }, { menuType }) {
            let _menuType, _menuTypeState

            if (menuType == 'desktop') {
                _menuType = 'Desktop'
                _menuTypeState = state.menuDesktopShow
            } else if (menuType == 'mobile') {
                _menuType = 'Mobile'
                _menuTypeState = state.menuMobileShow
            }
            if (!_menuTypeState) {
                localStorage.setItem('Menu' + _menuType + 'Exposed', 'true')
                commit('showMenu' + _menuType, true)
            } else {
                localStorage.setItem('Menu' + _menuType + 'Exposed', 'false')
                commit('showMenu' + _menuType, false)
            }
        },
        showMenu({ commit }, { menuType, flag }) {
            let _menuType

            if (menuType == 'desktop') {
                _menuType = 'Desktop'
            } else if (menuType == 'mobile') {
                _menuType = 'Mobile'
            }

            if (flag == true) {
                localStorage.setItem('Menu' + _menuType + 'Exposed', 'true')
                commit('showMenu' + _menuType, true)
            } else {
                localStorage.setItem('Menu' + _menuType + 'Exposed', 'false')
                commit('showMenu' + _menuType, false)
            }
        },
        checkMenuStateOnLoad({ commit }) {
            if (localStorage.getItem('MenuMobileExposed') == 'true')
                commit('showMenuMobile', true)
            else commit('showMenuMobile', false)
            if (localStorage.getItem('MenuDesktopExposed') == 'true')
                commit('showMenuDesktop', true)
            else commit('showMenuDesktop', false)
        }
    },
    modules: {
        auth,
        mainPage,
        editPage,
        notification,
        interfacePage,
        interfaceText
    }
})
