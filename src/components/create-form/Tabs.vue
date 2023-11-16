<template>
    <div class="tabs">
        <!--class="second"-->
        <div v-for="(tab, key) in tabs"
            :class="[tab.styleClass, {
                disabled: (isError && key !== currentTabId) || (tabDisabled && key != 0 && !isLastTab),
                active: key === currentTabId,
                checked: tab.isFilledIn
            }]"
            @click="setTab(key)"
            :key="key"
            class="tab">
            <span class="check" v-if="tab.isFilledIn"></span>
            <icon-alignleft v-if="!tab.isFilledIn && tab.icon === 'alignleft'"/>
            <icon-signalbars v-if="!tab.isFilledIn && tab.icon === 'signalbars'"/>
            {{tab.title}}
        </div>
    </div>
</template>

<script>
    import IconAlignleft from '@/components/icons/IconAlignleft'
    import IconSignalbars from '@/components/icons/IconSignalbars'
    import {createNamespacedHelpers} from 'vuex'

    const { mapMutations, mapState, mapGetters } = createNamespacedHelpers('mainPage')
    export default {
        name: "Tabs",
        computed: {
            ...mapState([
                'tabs',
                'currentTabId',
                'fields',
                'isError',
                'tabDisabled'
            ]),
            ...mapGetters([
                'isLastTab'
            ])
        },
        methods: {
            ...mapMutations([
                'setCurrentTabId'
            ]),
            setTab(tabId) {
                if (tabId == this.$store.state.mainPage.currentTabId) {
                    console.log('current tab pressed')
                } else {
                    this.$emit('setTab')
                }
            }
        },
        components: {
            IconAlignleft,
            IconSignalbars,
        }
    }
</script>

<style lang="scss" scoped>

.tab:not(.active) {
    cursor: pointer;
}

</style>