<template>
    <div class="calendar">
        <div class="calendar-label">
            <p>Срок</p>
        </div>
        <div class="fields">
            <div class="date-start">
                <input v-model="dateStartField"
                    v-mask="'####-##-##'"
                    @focus="dateStart = true"
                    type="text" placeholder="Дата начало">
                <span @mousedown="dateStart = !dateStart" class="icon-calendar"><icon-calendar/></span>
                <calendar v-if="dateStart"
                    @dateStartChange="dateStartField = $event"
                    :date="dateStartField"
                    @close="hideCalendar"
                    class="calendar-table"/>
            </div>
            <span class="wrap-slash">/</span>
            <div class="date-end">
                <input v-model="dateEndField"
                    v-mask="'####-##-##'"
                    @focus="dateEnd = true"
                    type="text" placeholder="Дата конец">
                <span @mousedown="dateEnd = !dateEnd" class="icon-calendar"><icon-calendar/></span>
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
import IconCalendar from '@/components/icons/IconCalendar.vue'
import Calendar from '@/components/edit-form/Calendar.vue'
import {mask} from 'vue-the-mask'

export default {
  data () {
    return {
      dateStart: false,
      dateEnd: false,
      dateStartField: new Date().toISOString().substr(0, 10),
      dateEndField: new Date().toISOString().substr(0, 10)
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
    IconCalendar,
    Calendar
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
    padding: 15px 37px 15px 15px;
    transition: .3s ease;

    &:hover {
        border-color: $blue;

        & ~ .icon-calendar {
            color: $blue;
        }
    }

    &:focus {
        border-color: $green-2;

        & ~ .icon-calendar {
            color: $green-2;
        }
    }
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
    width: 70%;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }

    @media screen and (max-width: 500px) {
        flex-wrap: wrap;
    }
}

.icon-calendar {
    position: absolute;
    right: 12px;
    top: calc(50% - 7px);
    z-index: 1;
    color: $grey-6;
    cursor: pointer;
    transition: .3s;

    &:hover {
        color: $blue;
    }
}

.date-start,
.date-end {
    position: relative;
    width: 242px;
    height: 38px;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
}

.date-end {
    @media screen and (max-width: 500px) {
        margin-top: 15px;
    }
}

.date-start .calendar-table {
    left: 0;
    top: calc(100% + 5px);
}

.date-end .calendar-table {
    right: 0;
    top: calc(100% + 5px);
}
// 316 x 302

</style>
