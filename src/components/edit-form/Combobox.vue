<template>
    <div class="combobox">
        <div class="combobox-label">
          <p>Пользователи</p>
        </div>
				<div class="select-box">
				  <v-combobox 
            v-model="select"
            :items="items"
            multiple
            chips
            placeholder="Выберите пользователя"
					  attach
          >
          <template  slot="no-data">
					  <p class="no-rezult"> Ничего не найдено. Нажмите на клавишу Ввод, чтобы добавить новую запись </p>
					</template>
					</v-combobox>
				</div>
    </div>
</template>

<script>
	export default {
				props: ['items'],
        data () {
    return {
      select: [],
    }
	}
}
</script>

<style lang="scss" scoped>
$grey-6: #6e7074;
$white-3: #e4e8eb;
$green-2:#376d27;
$blue: #089cd3;

.combobox{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.select-box{
	width: 70%;
}

.select-box /deep/ .v-input__slot:before, .select-box  /deep/ .v-input__slot:after {
	content: none;
}

.select-box /deep/ .v-input__append-inner{
	margin: auto 0;
	padding-right: 5px;
}
.combobox /deep/ .v-select__slot{
	border-radius: 5px;
	border: 1px solid $white-3;
	transition: .3s ease;
	&:hover {
		border-color: $blue;
		.theme--light.v-icon{
			color: $blue;
		}
	}
	&:focus-within {
			border-color: $green-2;
			.theme--light.v-icon {
				color: $green-2!important;
			}
	}
}
.select-box /deep/ .v-text-field input{
	padding: 15px 0 15px 15px;
}
.theme--light /deep/ .v-list__tile--link:hover{
	background: initial;
	.v-list__tile__title{
		color: $blue;
	}
		.v-icon{
			border-color: $blue!important;
	}
}

.combobox /deep/ .theme--light.v-chip {
	background: #f8f9fb;
}
.combobox /deep/ .v-input--checkbox .primary--text:after{
	opacity: 1!important;
}
.combobox  /deep/ .v-input--checkbox .primary--text{
		background-color: $blue;
    border-color: transparent !important;
}
.no-rezult{
	padding: 4px 11px;
	color: $grey-6;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.56px;
}
.select-box /deep/ .v-menu__content{
	top: 60px!important;
	box-shadow: 0 3px 37px 3px rgba(0, 0, 0, 0.08);
	border-radius: 4px;
	background-color: #ffffff;
}
.v-autocomplete__content.v-menu__content .v-card{
	border-radius: 4px;
}
</style>
