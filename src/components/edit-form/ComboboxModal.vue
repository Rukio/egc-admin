<template>
    <div class="comboboxmodal">
				<div class="select-box">
          <v-combobox 
            v-model="select"
            :items="items"
            multiple
            chips
            attach
            label="Пользователи"
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
	width: 100%;
}

.comboboxmodal /deep/ .v-input__slot:before {
	border-color: #dddddd;
	width: 99%;
}
.comboboxmodal  /deep/ .v-input__slot:after{
	width: 99%;
	border: 1px solid $green-2;
	background-color: $green-2;
}
.comboboxmodal /deep/ .theme--light.v-text-field:not(.v-input--has-state) .v-input__slot:hover:before{
	border: 1px solid $blue;
	background-color: $blue;
}


.comboboxmodal /deep/ .v-select__selections{
	min-height: 38px;
}

.comboboxmodal /deep/ .v-chip__content {
	height: 26px;
}
.comboboxmodal /deep/ .v-select__slot{
	border-radius: 5px;
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

.comboboxmodal /deep/ .theme--light.v-chip {
	background: #f8f9fb;
}
.comboboxmodal /deep/ .v-input--checkbox .primary--text:after{
	opacity: 1!important;
}
.comboboxmodal  /deep/ .v-input--checkbox .primary--text{
		background-color: $blue;
    border-color: transparent !important;
}

.comboboxmodal .v-input__icon > i {
	color: #999a9d;
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
