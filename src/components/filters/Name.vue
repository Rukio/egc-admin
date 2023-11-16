<template>
    <div class="dropdown" v-on-click-outside="hideDropDown">
        <input :id="'dd-filter-' + name" type="checkbox" v-model="showList"/>
        <label :for="'dd-filter-' + name">{{filterItems[name][title]}}<span class="triangle"></span></label>
        <icon-list v-if="name == 'category'"/>
        <icon-pencil-paper v-if="name == 'author'"/>
        <ul>
            <li v-for="(item, index) in items" v-if="item.id !== filterItems[name].id"
                @click="onFilter(item, name)" v-bind:key="index">{{item[title]}}</li>
        </ul>
    </div>
</template>

<script>
    import { mixin as onClickOutside } from 'vue-on-click-outside'
    import { createNamespacedHelpers } from 'vuex'
    import IconList from '@/components/icons/IconList.vue'
    import IconPencilPaper from '@/components/icons/IconPencilPaper.vue'

    const { mapMutations, mapState, mapActions } = createNamespacedHelpers('mainPage')

    export default {
        mixins: [onClickOutside],
        props: ['url', 'name', 'title', 'params'],
        data() {
            return {
                showList: false,
                items: [],
                focused: false
            }
        },
        computed: {
            ...mapState([
                'filterItems',
                'filterParams'
            ])
        },
        components: {
            IconList,
            IconPencilPaper
        },
        methods: {
            ...mapMutations([
                'setFilterItem'
            ]),
            hideDropDown() {
                this.showList = false
            },
            paramsToString(params) {
                let result = '?'
                for (let i = 0; i < params.length; i++) {
                    if (params[i].value) {
                        result += params[i].name + '=' + params[i].value + '&'
                    }
                }
                return result.substring(0, result.length - 1)
            },
            getItems() {
                this.$http.get(
                    this.url + this.paramsToString(this.filterParams[this.name])
                ).then(response => {
                    if(response.data.data) {
                        this.items = response.data.data
                        this.items.unshift(this.filterItems[this.name])
                    }
                })
            },
            onFilter(item, name) {
                this.hideDropDown()
                this.setFilterItem({filterId: name, item: item})
                this.$parent.getFirstPage()
            }
        },
        created() {
            this.getItems()
        }
    }
</script>

<style lang="scss" scoped>
$green-2:#376d27;

    .exposed {
        border-color: $green-2 !important;
    }

    label {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
