<template>
    <div class="dropdown-lang"
         @click="showList = !showList"
         :class="{'active': (showList === true),
                         '': (showList === false) }">
        <span class="name-lang">{{selected}}</span>
        <span class="lang">
          <img :src="require('@/assets/' + selected + '.jpg')" alt="img">
        </span>
        <span class="icon-arrow-down"><icon-arrow-down/></span>
        <ul class="lang-menu" v-show="showList === true">
            <li v-for="language in languages"
                :key="language"
                class="dropdown-list"
                @click="selected = language"
                v-if="language !== selected">
                <a>
                    <img :src="require('@/assets/' + language + '.jpg')" alt="img">
                    <span class="drop-name-lang">{{language}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import IconArrowDown from '@/components/icons/IconArrowDown.vue'

export default {
  name: 'DropdownLanguage',
  data () {
    return {
      languages: ['ru', 'en', 'fin'],
      showList: false,
      selected: 'ru'
    }
  },
  methods: {
    hideDropDown () {
      this.showList = false
    },
    changeLanguage (item) {
      console.log(item)
    }
  },
  components: {
    IconArrowDown
  }
}
</script>

<style lang="scss" scoped>
    $grey-6: #6e7074;
    $grey-3: #999a9d;
    $white-3: #e4e8eb;
    $green-2:#376d27;
    $blue: #089cd3;
    img {
        width: 22px;
        height: 22px;
        object-fit: cover;
        border-radius: 50%;
    }
    .active .name-lang,
    .active .icon-arrow-down {
        transition: .3s ease;
        color: $green-2 !important;
        #arrow-down {
            transform: rotate(-180deg);
        }
    }
    .name-lang {
        text-transform: uppercase;
        padding: 0 8px;
        color: $grey-3;
    }
    .dropdown-list:hover .drop-name-lang {
        color: $blue;
        transition: .3s ease;
    }
    .dropdown-lang:hover .icon-arrow-down,
    .dropdown-lang:hover .name-lang{
        color: $blue;
        transition: .3s ease;
    }
    .drop-name-lang {
        text-transform: uppercase;
        padding: 0 16px;
        color: $grey-3;
    }
    .lang {
        display: inline-block;
        line-height: 0;
        vertical-align: bottom;
        align-self: center;
    }
    .icon-arrow-down {
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        line-height: 0;
        color: $grey-6;
        padding-left: 15px;
        svg {
            width: 10px;
            height: 10px;
            transform: rotate(0deg);
            transition: .3s ease;
        }
    }
    .lang-menu {
        padding: 0 50px 0 14px;
    }
    .dropdown-lang{
        display: inline-block;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        margin-left: 25px;
        margin-right: 10px;
        ul {
            list-style-type: none;
            display: flex;
            cursor: default;
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: hidden;
            min-width: 100%;
            position: absolute;
            border-radius: 7px;
            white-space: nowrap;
            z-index: 2;
            margin-top: 11px;
            left: -14px;
            background-color: #fff;
            li {
                display: block;
                margin: 2px 0;
                cursor: pointer;
                a {
                    display: flex;
                    align-items: center;
                    padding: 8px 6px;
                }
            }
        }
    }
</style>
