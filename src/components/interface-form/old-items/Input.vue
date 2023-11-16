<template>
    <div class="list">
        <p>{{title}}</p>
        <input type="text" v-model="oldFields[name].value" disabled>
    </div>
</template>

<script>
    export default {
        props: ['title', 'name'],
        computed: {
            oldFields() {
                return this.$store.state.interfacePage.oldFields
            }
        }
    }
</script>

<style scoped>

</style>