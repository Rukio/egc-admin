<template>
    <div class="constructor_scroll">
        <div class="container-block" :class="{container_large: !$store.state.menuDesktopShow}">
            <div class="tittle">
                <div class="breadcrumbs">
                    <router-link to="/">Пользователи</router-link>
                    <span></span>
                    <h1>Петр Иванович</h1>
                </div>
            </div>
            <div class="edit_main edit_feed">
                <div class="folder radius_top">
                    <div class="column caption round-top">
                        <p>Редактирование контакта</p>
                    </div>
                    <div class="column caption round-top">
                        <p>Изменение пароля</p>
                    </div>
                </div>
                <div class="folder">
                    <div class="column round-bottom">
                        <div class="content">
                            <profile-picture class="content-field"/>
                            <calendar class="content-field"/>
                            <pdf-upload class="content-field"/>
														<combobox :items="items" class="content-field"/>
														<button @click="onAddItem"><icon-add/>Пригласить в аккаунт</button>
                        </div>
                    </div>
                    <div class="password-change column round-bottom">
                    </div>
                </div>
                <div class="buttons">
                    <button class="save">Сохранить</button>
                    <button class="cancel">Отмена</button>
                </div>
            </div>
						<create-modal v-if="isAdd"/>
        </div>
    </div>
</template>

<script>
import ProfilePicture from '@/components/edit-form/ProfilePicture.vue'
import PdfUpload from '@/components/edit-form/PDFUpload.vue'
import Calendar from '@/components/edit-form/CalendarStartEndInput.vue'
import Combobox from '@/components/edit-form/Combobox.vue'
import IconAdd from '@/components/icons/IconAdd'
import CreateModal from '@/components/pages/profile/CreateModal'
import FormBlock from '@/components/pages/profile/FormBlock'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('mainPage')

    export default {
			data(){
				return{
					 items: [
						'Елена Петровна',
						'Анна Ткач',
						'Иван Петрович',
						'Георгий',
						'Алиса Ивановна'
      		]
				}
			},
			computed: {
				...mapState([
					'isAdd'
				])
			},
			methods: {
				...mapActions([
					'onAddItem'
				])
			},
			components: {
					ProfilePicture,
					Calendar,
					PdfUpload,
					Combobox,
					CreateModal,
					IconAdd,
					FormBlock
			}
    }
</script>

<style lang="scss" scoped>
    $grey-6: #6e7074;

    .container {
        background: #fafcfb;
    }

    .edit_main .folder h2 {
        font-size: 15px;
    }

    .edit_main > .folder {
        .column {
            padding: 18px;
        }
    }

    .edit_feed .folder .column {
        border-radius: 0;
    }

    .constructor_scroll .container-block {
        background: #fafcfb;
    }

    .content-field {
        margin-top: 15px;
    }

    .constructor_scroll {
        overflow-x: initial;
        overflow-y: initial;
    }
    
</style>
