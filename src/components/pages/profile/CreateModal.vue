<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container modalcombobox">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
						<div class="caption">
                <div class="title-modal">Пригласить в аккаунт</div>
                <div @click="closeModal" class="close"></div>
            </div>
						<div class="modal-scroll">
                <div class="modal-content">
                    <form>
												<combobox-modal :items="items" class="content-field"/>
                    </form>
                </div>
            </div>
						<div class="btn-group">
							<a href="#" class="btn-close">Отмена</a>
							<a href="#" class="btn-add">Пригласить в аккаунт</a>
						</div>
        </div>
        </transition>
    </div>
</transition>
</template>

<script>
import ComboboxModal from '@/components/edit-form/ComboboxModal.vue'

import { createNamespacedHelpers } from 'vuex'

const { mapActions} = createNamespacedHelpers('mainPage')

	export default {
		
	data () {
		return {
			showed: false,
			items: [
						'Елена Петровна',
						'Анна Ткач',
						'Иван Петрович',
						'Георгий',
						'Алиса Ивановна'
      		]
		}
	},
	methods: {
		closeModal() {
			this.showed = false;
		},
		...mapActions([
				'modalClose'
		])
	},
	mounted() {
		this.showed = true;
	},
	components: {
		ComboboxModal
	}
}
       
</script>

<style lang="scss" scoped>
$grey-6: #6e7074;
$white-3: #e4e8eb;
$green-2:#376d27;
$blue: #089cd3;

.modalcombobox .modal-scroll{
	overflow-x: initial;
	overflow-y: initial;
}

.modalcombobox .caption{
	border-bottom: initial;
}

.modalcombobox .modal{
	width: 570px;
}

.modalcombobox .close{
	opacity: 0.3;
	&::before{
		background-color: $grey-6!important;
	}
	&::after{
		background-color: $grey-6!important;
	}
	&:hover{
		opacity: 1;
	}
}

.modalcombobox .btn-group{
	padding: 15px 22px;
	padding-bottom: 39px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

.modalcombobox .btn-group .btn-close{
	color: $grey-6;
	&:hover{
		color: $blue;
	}
}
.modalcombobox .btn-group .btn-add{
	padding: 10px 49px;
	color: $blue;
	border-radius: 19px;
	background-color: #ffffff;
	border: 1px solid $blue;
	&:hover{
		color: #ffffff;
		background-color: $blue;
	}
}
</style>
