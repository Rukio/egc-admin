<template>
    <div class="column">
        <div class="flag">
            <img :src="apiDomain + flag" alt="">
            <span>{{ name }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['flag', 'name'],
        computed: {
            apiDomain() {
                return this.$store.state.apiDomain
            }
        }
    }
</script>

<style scoped>

</style>