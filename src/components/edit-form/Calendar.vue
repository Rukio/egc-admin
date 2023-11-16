<template>
<transition name="modalbg">
    <div ref="calendar" class="calendar-board">
        <!-- <div v-on-click-outside="hide" class="calendar-board"> -->
        <v-date-picker v-model="dateField"
            locale="ru"
            :reactive="true"
            first-day-of-week="1"
            color="#089cd3"
            no-title></v-date-picker>
    </div>
</transition>
</template>

<script>
import { mixin as onClickOutside } from 'vue-on-click-outside'

export default {
  mixins: [onClickOutside],
  data () {
    return {
      dateField: '',
      dateLocal: this.date
    }
  },
  props: {
    date: {
      type: String,
      required: true
    }
  },
  methods: {
    hide () {
      this.$emit('close')
    },
    isValidDate (date) {
      return date instanceof Date && !isNaN(date.getTime())
    }
  },
  created () {
    if (this.date.length === 10) { this.dateField = this.date } else new Date().toISOString().substr(0, 10)
  },
  watch: {
    dateField () {
      this.dateLocal = this.dateField
      this.$emit('dateStartChange', this.dateLocal)
      this.$emit('dateEndChange', this.dateLocal)
    }
  },
  mounted () {
    document.querySelector('body')
      .addEventListener('click', e => {
        e.stopPropagation()
        if (typeof this.$refs.calendar !== 'undefined') {
          if (!this.$refs.calendar.contains(e.target)) { this.hide() }
        }
      })
  }
}
</script>

<style lang="scss" scoped>
    $grey-6: #6e7074;
    $blue: #089cd3;
    $grey-3: #999a9d;
    $white: #fff;

    .calendar-board {
        box-shadow: 0px 0px 74px 0px rgba(0,0,0,0.15);
        border-radius: 4px;

        & /deep/ .v-date-picker-header__value strong {
            font-weight: 500;
        }

        & /deep/ .v-date-picker-header .v-btn:hover:before {
            background-color: transparent;
        }

        & /deep/ .v-btn:hover .v-btn__content .v-icon {
            color: $blue;
        }

        & /deep/ .theme--light.v-date-picker-table th {
            color: $grey-3;
            font-weight: 500;
        }

        & /deep/ .theme--light.v-date-picker-table td .v-btn__content {
            color: $grey-6;
        }

        & /deep/ .v-date-picker-table .v-btn:hover:before {
            background-color: $blue;
        }

        & /deep/ .v-date-picker-table .v-btn:hover .v-btn__content {
            color: $blue;
        }

        & /deep/ .v-date-picker-table .v-btn.v-btn--active .v-btn__content {
            color: $white !important;
        }

        & /deep/ .v-date-picker-table--month {
            .v-btn.v-btn--active, & .v-btn.v-btn--outline, & .v-btn:hover:before {
                border-radius: 4px;
            }
        }

        & /deep/ .v-picker {
            border-radius: 4px;
        }

        & /deep/ .v-picker__body {
            border-top-left-radius: 4px !important;
            border-top-right-radius: 4px !important;
            border-bottom-left-radius: 4px !important;
            border-bottom-right-radius: 4px !important;
        }
    }

    .calendar-board /deep/ .v-date-picker-table {
        height: 230px;
    }

</style>
