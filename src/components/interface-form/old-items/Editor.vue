<template>
    <div class="article">
        <p>{{title}}</p>
        <p v-html="oldFields[name].value"></p>
    </div>
</template>

<script>
    export default {
        props: ['title', 'name'],
        computed: {
            oldFields() {
                return this.$store.state.interfaceText.oldFields
            }
        }
    }
</script>

<style scoped>

</style>