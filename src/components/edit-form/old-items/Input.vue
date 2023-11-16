<template>
    <div class="list">
        <p>{{title}}</p>
        <input type="text" v-model="oldFields[name]" disabled>
    </div>
</template>

<script>
    export default {
        props: ['title', 'name'],
        computed: {
            oldFields() {
                return this.$store.state.editPage.oldFields
            }
        }
    }
</script>

<style scoped>

</style>