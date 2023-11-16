<template>
    <div class="article">
        <p>{{title}}</p>
        <p v-html="oldFields[name]"></p>
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