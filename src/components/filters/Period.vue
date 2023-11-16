<template>
    <div class="period">
        <ul>
            <li v-for="(item, index) in items"
                    :key="item"
                    @click="selected = index"
                    :class="{ edgeFirst: index === 0,
                              edgeLast: index === items.length-1,
                              active:index === selected }"
                    class="datesList">
                    {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Period',
  data () {
    return {
      items: ['Все', 'Месяц', 'Неделя', 'День'],
      selected: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
