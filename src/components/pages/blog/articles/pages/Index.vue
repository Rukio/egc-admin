<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <h1>{{textContent.titleMain}}</h1>
                <div class="drop_search">
                    <table-filter class="filter" :url="apiUrls.articleCategories" name="category" title="title"></table-filter>
                    <table-filter class="filter" :url="apiUrls.authors" name="author" title="name"></table-filter>
                    <!--<search></search>-->
                </div>
            </div>
            <div class="subtitle with-pagination">
                <div class="modal_button">
                    <button @click="onAddItem"><icon-add/>{{textContent.addItemText}}</button>
                </div>
                <div class="amount_pagination">
                    <quantity></quantity>
                    <pagination></pagination>
                </div>
            </div>
            <p class="no-message" v-if="emptyData">{{textContent.notFoundText}}</p>
            <main-table v-else></main-table>
            <pagination :is-bottom="true" v-if="!emptyData"></pagination>
            <create-modal v-if="isAdd"></create-modal>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Search from '@/components/Search'
import Quantity from '@/components/filters/Quantity'
import TableFilter from '@/components/filters/Name'
import Period from '@/components/filters/Period'
import CreateModal from '../CreateModal'
import MainTable from '../MainTable'
import CalendarFilters from '@/components/filters/CalendarFilters'
import { createNamespacedHelpers } from 'vuex'
import IconAdd from '@/components/icons/IconAdd'

const { mapMutations, mapGetters, mapActions, mapState } = createNamespacedHelpers('mainPage')

export default {
  computed: {
    ...mapState([
      'textContent',
      'currentNumber',
      'filterItems',
      'isAdd',
      'emptyData'
    ]),
    ...mapGetters([
      'countItems'
    ]),
    apiUrls () {
      return this.$store.state.apiUrls
    }
  },
  methods: {
    ...mapMutations([
      'setUrl',
      'setTextContent',
      'setFilterItems',
      'resetModule',
      'setSharedParams',
      'setSortingParams',
      'setPaginationParams',
      'setFilterParams'
    ]),
    ...mapActions([
      'onAddItem',
      'getItems'
    ]),
    getFirstPage () {
      this.setSharedParams([{name: 'article_category_id', value: this.filterItems.category.id}, {name: 'article_author_id', value: this.filterItems.author.id}])
      this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
      this.getItems()
    }
  },
  created () {
    this.resetModule()
    this.setUrl(this.apiUrls.articles)
    this.setTextContent({
      titleMain: 'Статьи',
      addItemText: 'Добавить',
      notFoundText: 'Статей не найдено',
      addGreeting: 'Статья успешно создана',
      deleteGreeting: 'Статья успешно удалена',
      titleAdd: 'Добавить',
      cancelButton: 'Отмена',
      submitButton: 'Добавить'
    })
    this.setFilterItems({
      author: {name: 'Все авторы', id: ''},
      category: {title: 'Все категории', id: ''}
    })
    this.setFilterParams({
      author: [],
      category: [{name: 'use_case', value: 'for article'}]
    })
    this.setSharedParams([{name: 'article_category_id', value: null}, {name: 'article_author_id', value: null}])
    this.setSortingParams([{name: 'method', value: 'desc'}, {name: 'field', value: 'id'}])
    this.setPaginationParams([{name: 'page', value: 1}, {name: 'number', value: this.currentNumber}])
  },
  components: {
    Pagination,
    Search,
    MainTable,
    Quantity,
    CreateModal,
    TableFilter,
    Period,
    CalendarFilters,
    IconAdd
  }
}
</script>

<style lang="scss" scoped>
    $grey-3: #999a9d;

    .constructor-scroll .no-message {
        color: $grey-3;
    }

    .constructor_scroll .container-block .tittle {
        @media screen and (max-width: 550px) {
            flex-direction: column !important;
        }

        h1 {
            @media screen and (max-width: 550px) {
                align-self: flex-start;
            }
        }
    }

    #app .tittle .drop_search {
        @media screen and (max-width: 550px) {
            margin-top: 12px;
            width: 100%;
        }

        .filter {
            @media screen and (max-width: 550px) {
                width: 100%;
            }
        }
    }

    .constructor_scroll .container-block .subtitle button {
        @media screen and (max-width: 619px) {
            width: 100%;
        }
    }
</style>
