<template>
    <transition name="fade">
        <div class="user-popup" v-if="$store.state.showHeaderPopup">
            <div class="btns">
                <a href="#" class="button"><font-awesome-icon :icon="faUser"/>Профиль</a>
                <a href="/logout" class="button"><font-awesome-icon :icon="faSignInAlt"/>Выйти</a>
            </div>
        </div>
    </transition>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faSignInAlt from '@fortawesome/fontawesome-free-solid/faSignInAlt'

export default {
  computed: {
    faUser () {
      return faUser
    },
    faSignInAlt () {
      return faSignInAlt
    }
  },
    methods: {

    },

  components: {
    FontAwesomeIcon
  }
}
</script>
<style scoped>

</style>
