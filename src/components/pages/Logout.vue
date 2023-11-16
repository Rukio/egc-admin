<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapActions} = createNamespacedHelpers('auth')
    export default {
        name: 'Logout',
        methods: {
            ...mapActions([
                'logout'
            ]),
        },
        created() {
            delete localStorage.token
            this.logout()
            this.$router.push('/login')
        }
    }
</script>
