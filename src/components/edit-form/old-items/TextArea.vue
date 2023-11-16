<template>
    <div class="list">
        <p>{{title}}</p>
        <textarea v-model="oldFields[name]" cols="30" rows="10" disabled></textarea>
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

<style lang="scss" scoped>
    .list {
        align-items: flex-start !important;
    }
</style>