<template>
    <div class="column">
        <div class="flag">
            <div class="dropdown" v-on-click-outside="hideList">
                <input :id="switchId ? switchId : dropId" type="checkbox" v-model="showList"/>
                <label :for="switchId ? switchId : dropId">
                    <img :src="apiDomain + selected.flag" alt="">
                    <span>{{ selected.name }}</span>
                    <span class="triangle"></span>
                </label>
                <ul>
                    <li v-for="lang in languages" :key="lang.id" v-if="lang.id !== selected.id" @click="changeLang(lang.id)">
                        <img :src="apiDomain + lang.flag" alt="">
                        <span>{{ lang.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mixin as onClickOutside } from 'vue-on-click-outside'
    import { createNamespacedHelpers } from 'vuex'

    const { mapActions } = createNamespacedHelpers('editPage')
    export default {
        mixins: [onClickOutside],
        props: ['languages', 'selected', 'switchId'],
        name: "LangSwitch",
        data() {
            return {
                showList: false,
                dropId: 'dr-langs'
            }
        },
        computed: {
            apiDomain() {
                return this.$store.state.apiDomain
            }
        },
        methods: {
            ...mapActions([
                'getFields'
            ]),
            hideList () {
                this.showList = false
            },
            changeLang (langId) {
                this.hideList()
                this.$parent.onLangChange(langId)
            },
        },
    }
</script>

<style scoped>

</style>