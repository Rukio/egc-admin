<template>
    <div class="pagination" :class="{pagination_bottom: isBottom}" v-if="items.length">
        <p>Показано <span>{{ meta.from }}</span> - <span>{{ meta.to }}</span> из <span>{{ meta.total }}</span></p>
        <ul v-show="meta.last_page !== 1">
            <li><a class="prev" :class="{inactive: !links.prev}" @click.prevent="changePageByUrl(links.prev)"></a></li>
            <li v-if="hasFirst"><a @click="changePageByNumber(1)">1</a></li>
            <li v-if="hasPreFirst" class="dots"></li>
            <li v-for="page in pages"><a :class="{ 'active': page === meta.current_page }"
                                         @click="changePageByNumber(page)">{{ page }}</a></li>
            <li v-if="hasPreLast" class="dots"></li>
            <li v-if="hasLast"><a @click="changePageByNumber(meta.last_page)">{{ meta.last_page }}</a></li>
            <li><a class="next" :class="{inactive: !links.next}" @click.prevent="changePageByUrl(links.next)"></a></li>
        </ul>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapActions, mapState, mapMutations} = createNamespacedHelpers('mainPage')

    export default {
        props: ['isBottom', 'params'],
        name: 'Pagination',
        data() {
            return {
                pageRange: 2
            }
        },
        computed: {
            ...mapState({
                currentNumber: state => state.currentNumber,
                meta: state => state.meta,
                links: state => state.links,
                items: state => state.items
            }),
            hasFirst() {
                return this.rangeStart !== 1
            },
            hasPreFirst() {
                return this.rangeStart > 2
            },
            hasPreLast() {
                return this.rangeEnd < this.meta.last_page - 1
            },
            hasLast() {
                return this.rangeEnd < this.meta.last_page
            },
            pages() {
                let pages = []
                for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
                    pages.push(i)
                }
                return pages
            },
            rangeStart() {
                const start = this.meta.current_page - this.pageRange
                return (start > 0) ? start : 1
            },
            rangeEnd() {
                const end = this.meta.current_page + this.pageRange
                return (end < this.meta.last_page) ? end : this.meta.last_page
            }
        },
        methods: {
            ...mapMutations([
                'setPaginationParams'
            ]),
            ...mapActions([
                'getItems'
            ]),
            changePageByNumber(number) {
                if (number !== this.meta.current_page) {
                    this.setPaginationParams([{name: 'page', value: number}, {name: 'number', value: this.currentNumber}])
                    this.getItems()
                }
            },
            changePageByUrl(url) {
                if (url) {
                    this.setPaginationParams([{name: 'page', value: url.split('=')[1]}, {name: 'number', value: this.currentNumber}])
                    this.getItems()
                }
            }
        }
    }
</script>

<style lang="scss">
    
$white: #fff;
$main-bg-color: #f1f2f7;
$white-4: #dddddd;
$white-2:#f8f9fb;
$grey-4: #d8d9d9;

$grey-5: #55575c;
$grey-3: #999a9d;
$grey-6: #6e7074;
$grey-2: #46484c;

$blue: #089cd3;

$pink:#f27777;

$green:#61cc40;
$green-2:#376d27;

$grey-7: rgba(70,72,77,.9);
$grey-1: #46484c;
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination {
    @extend .flex;
    color: $grey-3;
    font-size: 14px;

    @media screen and (max-width: 479px) {
        flex-direction: column;
        justify-content: center;
    }
        p {
            margin-bottom: 0;
            white-space: nowrap;

        @media screen and (max-width: 479px) {
            margin-bottom: 15px;
        }
            span {
            color: $grey-6;
            font-weight: 500;
            }
        }
        ul {
            display: flex;
            list-style-type: none;
            margin-left: 10px;

            @media screen and (max-width: 479px) {
                margin-left: 0;
                margin-top: 12px;
                padding-left: 0;
            }
            li {
                &:not(:last-child) {
                    margin-right: 1px;
                }
            }
            a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                color: $grey-6;
                transition: .5s;
                cursor: pointer;
                border-radius: 50%;
                &:not(.inactive):hover {
                background: rgba($blue, .1);
                color: $blue;
            }
        }
        .prev {
            position: relative;
            &:before {
            content: "";
            top: 10px;
            left: 12px;
            display: block;
            width: 7px;
            height: 7px;
            border: 0 solid;
            border-width: 0 0 2px 2px;
            position: absolute;
            transform: rotate(45deg);
            }
        }
        .next {
            position: relative;
            &:before {
            content: "";
            top: 10px;
            left: 8px;
            display: block;
            width: 7px;
            height: 7px;
            border: 0 solid;
            border-width: 2px 2px 0 0;
            position: absolute;
            transform: rotate(45deg);
            }
        }
        .inactive {
            opacity: .6;
            &:hover {
            background: transparent !important;
            }
        }
        .active {
        background: $blue;
        color: $white;
        }
    }
    &.pagination_bottom {
        padding: 16px 22px;
        background-color: $white;
    }
}


</style>
