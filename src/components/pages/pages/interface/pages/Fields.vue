<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/page">Страницы</router-link>
                    <span></span>
                    <router-link :to="'/page/' + $route.params.pageId">{{ $store.state.editPage.oldFields.title }}</router-link>
                    <span></span>
                    <h1>{{interfaceGroup.title}}</h1>
                </div>
            </div>
            <div class="modal_button fields">
                <button @click="onAddItem('fields')"><icon-add/>Добавить поле</button>
                <button @click="onAddItem('texts')"><icon-add/>Добавить текст</button>
            </div>
            <fields :isAdding="isAddingFields"></fields>
            <texts :isAdding="isAddingTexts"></texts>
        </div>
    </div>
</template>

<script>
    import Fields from '../Fields'
    import Texts from '../Texts'
    import { createNamespacedHelpers } from 'vuex'
    import IconAdd from '@/components/icons/IconAdd'

    const { mapState, mapMutations } = createNamespacedHelpers('interfacePage')

    export default {
        data: function () {
            return {
                isAddingFields: false,
                isAddingTexts: false,
                pageTitle: ''
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'interfaceGroup',
                'isAdd',
                'editPage/oldFields'
            ]),
        },
        methods: {
            ...mapMutations([
                'setIsAdd'
            ]),
            onAddItem(type) {
                if (type == 'fields') {
                    this.$store.commit('interfacePage/setIsAdd', true, { root: true })
                    this.isAddingFields = true
                } else if (type == 'texts') {
                    this.$store.commit('interfaceText/setIsAdd', true, { root: true })
                    this.isAddingTexts = true
                }
            }
        },
        created() {
            console.log(this.$route.params)
            this.$http.get(
                this.$store.state.interfacePage.url + '?interface_group_id=' + this.$store.state.interfacePage.itemId + '&language_id=1'
            ).then((result) => {
                console.log(result)
            }).catch(() => {

            })
            this.pageTitle = ''
        },
        components: {
            Fields,
            Texts,
            IconAdd
        }
    }
</script>

<style lang="scss" scoped>
.modal_button {
    background: #ffffff;
}

.container-block {
    background: #fafcfb;
    padding-bottom: 22px;
}
</style>