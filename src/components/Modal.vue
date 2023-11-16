<template>
<transition name="modalbg" v-on:enter="showed = true"
    v-on:leave="showed = false">
    <div class="pop_up_container" v-show="$store.state.showModal" @click.self="$store.commit('setShowModal', false)">
        <transition name="modal">
            <div v-if="showed" class="delete_pop_up">
                <div class="heading">
                    <div class="caption">Удалить?</div>
                    <div class="close" @click="$store.commit('setShowModal', false)"></div>
                </div>
                <div class="text-block">
                    <icon-warning class="icon"></icon-warning>
                    <p>Вы действительно хотите удалить "{{$store.state.itemForDelete.title}}"?</p>
                </div>
                <div class="buttons">
                    <button @click="$store.commit('setShowModal', false)" class="button-cancel">Отмена</button>
                    <button @click="deleteItemLocal" class="button-yes">Да</button>
                </div>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
import IconWarning from '@/components/icons/IconWarning'
import {createNamespacedHelpers} from 'vuex'

const {mapActions} = createNamespacedHelpers('mainPage')
export default {
  name: 'Modal',
  data() {
      return {
          showed: false
      }
  },
  methods: {
    ...mapActions([
      'testAndDeleteItem',
      'deleteItem'
    ]),
    deleteItemLocal () {
      let action = this.$store.state.itemForDelete.action
      let url = this.$store.state.itemForDelete.url
      let api = this.$store.state.itemForDelete.api

      if (action === 'testAndDeleteItem') {
        this.testAndDeleteItem(this.$store.state.itemForDelete)

      } else if (action === 'deleteItem') {
        this.deleteItem(this.$store.state.itemForDelete.id)

      } else if (action === 'request') {
        let id = this.$store.state.itemForDelete.id
        this.$http.get(
          api + url + '?article_category_id=' + id
        ).then(response => {
          if (response.data.data.length) {
            this.$store.dispatch('notification/triggerSelfDismissingNotification', {
              message: this.textContent.deleteError,
              isError: true
            }, {root: true})
          } else {
            this.testAndDeleteItem({
              url: '/api/article?article_category_id=' + id,
              id: id
            })
          }
        }).catch(error => {
          this.$store.dispatch('notification/errorAxios', error.response.status, {root: true})
        })
      }
      this.$store.commit('setShowModal', false)
    }
  },
  components: {
    IconWarning
  }
}
</script>

<style lang="scss" scoped>
    $grey-2: #46484c;

    .pop_up_container {
        position: fixed;
        padding: 15px;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(70, 72, 76, 0.3);
    }

    #app .delete_pop_up {
        width: 370px;
        border-radius: 7px;
        box-shadow: 0 3px 37px 3px rgba(0, 0, 0, 0.09);
        background-color: white;
        border: 1px solid #eee;
        overflow: hidden;

        .heading .caption {
            font-size: 15px !important;
        }
    }

    .heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 17px 20px;
        background-color: #f8f9fb;
        border-bottom: 1px solid #e7ebed;

        .caption {
            color: $grey-2;
        }
    }

    .text-block {
        padding: 20px;
        display: flex;
    }

    .text-block p {
        color: #6e7074;
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;
    }

    .icon {
        width: 24px;
        height: 24px;
        color: #f27777;
        flex-shrink: 0;
        margin-right: 14px;
    }

    .buttons {
        padding: 20px;
        padding-top: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .button-cancel,
    .button-yes {
        font-size: 14px;
    }

    .button-yes {
        width: 70px;
        height: 39px;
        background-color: #089cd3;
        border-radius: 19px;
        border: 1px solid transparent;
        color: white;
        transition: 0.3s;
        margin-left: 24px;
    }

    .button-yes:hover {
        background-color: transparent;
        border: 1px solid #089cd3;
        transition: 0.3s;
        color: #089cd3;
    }

    .button-cancel {
        background-color: transparent;
        border: none;
        color: #6e7074;
        transition: 0.3s;
    }

    .button-cancel:hover {
        transition: 0.3s;
        color: #089cd3;
    }
</style>
