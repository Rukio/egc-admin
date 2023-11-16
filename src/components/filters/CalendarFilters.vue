<template>
    <div class="calendar">
        <div class="fields">
            <div class="date-start" @click="dateStart = true"
                :class="{'active': (dateStart === true),
                         '': (dateStart === false) }">
                <input v-model="dateStartField"
                       disabled
                       v-mask="'####-##-##'"
                       type="text" placeholder="Дата начало">
                <span class="icon-calendar-filters"><icon-calendar-filters/></span>
                <span class="icon-arrow-down"><icon-arrow-down/></span>
                <calendar v-if="dateStart"
                          @dateStartChange="dateStartField = $event"
                          :date="dateStartField"
                          @close="hideCalendar"
                          class="calendar-table"/>
            </div>
            <div class="date-end" @click="dateEnd = true"
                 :class="{'active': (dateEnd === true),
                         '': (dateEnd === false) }">
                <input v-model="dateEndField"
                       disabled
                       v-mask="'####-##-##'"
                       type="text" placeholder="Дата конец">
                <span class="icon-calendar-filters"><icon-calendar-filters/></span>
                <span class="icon-arrow-down"><icon-arrow-down/></span>
                <calendar v-if="dateEnd"
                          @dateEndChange="dateEndField = $event"
                          :date="dateEndField"
                          @close="hideCalendar"
                          class="calendar-table"/>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from '@/components/edit-form/Calendar.vue'
import IconCalendarFilters from '@/components/icons/IconCalendarFilters.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import {mask} from 'vue-the-mask'

export default {
  name: 'CalendarFilters',
  data () {
    return {
      dateStart: false,
      dateEnd: false,
      dateStartField: 'Дата начало',
      dateEndField: 'Дата конец'
    }
  },
  methods: {
    hideCalendar () {
      this.dateStart = false
      this.dateEnd = false
    }
  },
  directives: {mask},
  components: {
    Calendar,
    IconCalendarFilters,
    IconArrowDown
  },
  watch: {
    dateEndField () {
      this.dateEnd = false
    },
    dateStartField () {
      this.dateStart = false
    }
  }
}
</script>

<style lang="scss" scoped>
    $grey-6: #6e7074;
    $grey-3: #999a9d;
    $white-3: #e4e8eb;
    $green-2:#376d27;
    $blue: #089cd3;

    input {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid $white-3;
        color: $grey-6;
        padding: 15px 37px 15px 47px;
        transition: .3s ease;
    }

    .wrap-slash {
        margin: 0 16px;
        color: $grey-3;

    @media screen and (max-width: 500px) {
        display: none;
    }
    }

    .calendar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 7.5px;
        width: 400px;

    @media screen and (max-width: 1200px) {
        flex-wrap: wrap;
    }

    &-label {
         color: $grey-6;
     }

    &-table {
         position: absolute;
         z-index: 99999;
     }
    }

    .fields {
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }

    @media screen and (max-width: 500px) {
        flex-wrap: wrap;
    }
    }
    .icon-arrow-down {
        position: absolute;
        right: 27px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        line-height: 0;
        color: $grey-6;
        cursor: pointer;
        svg {
            width: 10px;
            height: 10px;
            transform: rotate(0deg);
            transition: .3s ease;
        }
    }
    .icon-calendar-filters {
        position: absolute;
        left: 22px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 0;
        z-index: 1;
        color: $grey-6;
        cursor: pointer;
        transition: .3s ease;
    }
    .active input::placeholder {
        transition: .3s ease;
        color: $green-2 !important;
    }
    .active .icon-calendar-filters,
    .active .icon-arrow-down,
    .active input{
        transition: .3s ease;
        color: $green-2 !important;
        #arrow-down {
            transform: rotate(-180deg);
        }
    }

    .date-start:hover .icon-calendar-filters,
    .date-start:hover .icon-arrow-down,
    .date-start:hover input,
    .date-start:hover input::placeholder,
    .date-end:hover .icon-calendar-filters,
    .date-end:hover .icon-arrow-down,
    .date-end:hover input,
    .date-end:hover input::placeholder {
        color: $blue;
        transition: .3s ease;
        cursor: pointer;
    }
    .date-start,
    .date-end {
        position: relative;
        width: 200px;
        height: 38px;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
    }
    .date-start input {
        border-bottom-left-radius: 100vh;
        border-top-left-radius: 100vh;
    }
    .date-end input {
        border-bottom-right-radius: 100vh;
        border-top-right-radius: 100vh;
    }

    .date-start .calendar-table {
        left: 0;
        top: calc(100% + 5px);
    }

    .date-end .calendar-table {
        right: 0;
        top: calc(100% + 5px);
    }

</style>
