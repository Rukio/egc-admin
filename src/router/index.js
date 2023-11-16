import Vue from 'vue'
import Router from 'vue-router'
// import Translate from '@/components/pages/Translate'
// import new_template from '@/components/pages/new_template'
import Login from '@/components/pages/Login'
import Logout from '@/components/pages/Logout'
import Registration from '@/components/pages/registration/Registration'
import Profile from '@/components/pages/profile/Index'
import Error from '@/components/errors/error-404'
// import EditPage from '@/components/page s/EditPage'
// import Pages from '@/components/pages/Pages'
import Feedback from '@/components/pages/feedback/pages/Index'
import ReadFeedback from '@/components/pages/feedback/pages/Read'
import Vacancies from '@/components/pages/vacancies/pages/Index'
import EditVacancy from '@/components/pages/vacancies/pages/Edit'
// import Services from '@/components/pages/services/pages/Index'
// import EditService from '@/components/pages/services/pages/Edit'
import ServicesCategories from '@/components/pages/services/categories/pages/Index'
import EditServicesCategory from '@/components/pages/services/categories/pages/Edit'
import Services from '@/components/pages/services/services/pages/Index'
import EditService from '@/components/pages/services/services/pages/Edit'

import Contacts from '@/components/pages/contacts/pages/Index'
import EditContact from '@/components/pages/contacts/pages/Edit'

import Clients from '@/components/pages/clients/pages/Index'
import EditClient from '@/components/pages/clients/pages/Edit'
import BlogCategories from '@/components/pages/blog/categories/pages/Index'
import EditBlogCategory from '@/components/pages/blog/categories/pages/Edit'
import BlogSubcategories from '@/components/pages/blog/subcategories/pages/Index'
import EditBlogSubcategory from '@/components/pages/blog/subcategories/pages/Edit'
import BlogArticles from '@/components/pages/blog/articles/pages/Index'
import BlogEditArticle from '@/components/pages/blog/articles/pages/Edit'
import BlogAuthors from '@/components/pages/blog/authors/pages/Index'
import BlogEditAuthor from '@/components/pages/blog/authors/pages/Edit'
import PortfolioCategories from '@/components/pages/portfolio/categories/pages/Index'
import EditPortfolioCategory from '@/components/pages/portfolio/categories/pages/Edit'
import Projects from '@/components/pages/portfolio/projects/pages/Index'
import EditProject from '@/components/pages/portfolio/projects/pages/Edit'
import Pages from '@/components/pages/pages/pages/Index'
import EditPage from '@/components/pages/pages/pages/Edit'
import EditPageInterfaceGroup from '@/components/pages/pages/interface/pages/Fields'
import Interface from '@/components/pages/interface/pages/Index'
import EditInterface from '@/components/pages/interface/pages/Fields'
import Index from '@/components/pages/Index'

import Notification from '@/components/pages/notification/pages/Index'
import Questionnaire from '@/components/pages/questionnaire/pages/Index'
import ReadQuestionnaire from '@/components/pages/questionnaire/pages/Read'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '/questionnaire',
            name: 'questionnaire',
            component: Questionnaire
				},
				{
					path: '/notification',
					name: 'notification',
					component: Notification
			},
        {
            path: '/questionnaire/:id',
            name: 'readQuestionnaire',
            component: ReadQuestionnaire
        },
        {
            path: '/interface',
            name: 'interface',
            component: Interface
        },
        {
            path: '/interface/:id',
            name: 'interface-edit',
            component: EditInterface
        },
        {
            path: '/page',
            name: 'pages',
            component: Pages
        },
        {
            path: '/page/:id',
            name: 'pages-edit',
            component: EditPage
        },
        {
            path: '/page/:pageId/interface-group/:groupId',
            name: 'pages-interface-group-edit',
            component: EditPageInterfaceGroup
        },
        {
            path: '/portfolio/project',
            name: 'portfolio-project',
            component: Projects
        },
        {
            path: '/portfolio/project/:id',
            name: 'portfolio-project-edit',
            component: EditProject
        },
        {
            path: '/portfolio/category',
            name: 'portfolio-category',
            component: PortfolioCategories
        },
        {
            path: '/portfolio/category/:id',
            name: 'portfolio-category-edit',
            component: EditPortfolioCategory
        },
        // services
        {
            path: '/services/service',
            name: 'services-service',
            component: Services
        },
        {
            path: '/services/service/:id',
            name: 'services-service-edit',
            component: EditService
        },
        {
            path: '/services/category',
            name: 'services-category',
            component: ServicesCategories
        },
        {
            path: '/services/category/:id',
            name: 'services-category-edit',
            component: EditServicesCategory
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration
        },
        {
            path: '/blog/category',
            name: 'blog-categories',
            component: BlogCategories
        },
        {
            path: '/blog/category/:id',
            name: 'blog-edit-article-category',
            component: EditBlogCategory
        },
        {
            path: '/blog/category/:id/subcategory',
            name: 'blog-subcategories',
            component: BlogSubcategories
        },
        {
            path: '/blog/category/:categoryId/subcategory/:subcategoryId',
            name: 'blog-edit-article-subcategory',
            component: EditBlogSubcategory
        },
        {
            path: '/blog/article',
            name: 'blog-articles',
            component: BlogArticles
        },
        {
            path: '/blog/article/:id',
            name: 'blog-edit-article',
            component: BlogEditArticle
        },
        {
            path: '/blog/author',
            name: 'blog-authors',
            component: BlogAuthors
        },
        {
            path: '/blog/author/:id',
            name: 'blog-edit-authors',
            component: BlogEditAuthor
        },
        {
          path: '/contact',
          name: 'contact',
          component: Contacts
        },
        {
          path: '/contact/:id',
          name: 'edit-contact',
          component: EditContact
        },
        {
            path: '/',
            name: 'feedback',
            component: Feedback
        },
        {
            path: '/feedback/:id',
            name: 'readFeedback',
            component: ReadFeedback
        },
        // {
        //     path: '/service',
        //     name: 'Services',
        //     component: Services
        // },

        // {
        //     path: '/service/:id',
        //     name: 'EditService',
        //     component: EditService
        // },
        {
            path: '/client',
            name: 'Clients',
            component: Clients
        },
        {
            path: '/client/:id',
            name: 'EditClient',
            component: EditClient
        },
        {
            path: '/vacancy',
            name: 'Vacancies',
            component: Vacancies
        },
        {
            path: '/vacancy/:id',
            name: 'EditVacancy',
            component: EditVacancy
        },
        {
            path: '*',
            name: '404',
            component: Error
        }
    ]
})
