<template>
    <div>
     <form @submit.prevent="register" method="post" class="form">
			 <div class="list">
				<label>Пол</label>
				<div class="radiogroup">
					<label>М</label>
					<input type="radio" name="gender" value="men" v-model="user.radio"/>
					<label>Ж</label>
					<input type="radio" name="gender" value="women" v-model="user.radio" />	
				</div>
				<div class="text-danger">{{ errors.radio }}</div>
			 </div>
      <div class="list">
        <label>Name:</label>
        <input type="text" v-model="user.name" class="form-control" />
        <div class="text-danger">{{ errors.name }}</div>
      </div>
      <div class="list">
        <label>Phone:</label>
				<input type="text" v-model="user.phone" class="form-control" @keydown="cislo"/>
				<div class="text-danger">{{ errors.phone }}</div>
      </div>
      <div class="list">
        <label>Email:</label>
        <input type="text" v-model="user.email" class="form-control" />
        <div class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="list checkbox">
        <label>Согласие</label>
        <input type="checkbox" name="checkbox" v-model="user.check" />
        <div class="text-danger">{{ errors.check }}</div>
      </div>
      <div class="buttons">
        <button class="save" @click="onAddItem" type="submit">Submit</button>
      </div>
    </form>
    </div>
</template>

<script>
import CreateModal from '@/components/pages/profile/CreateModal'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('mainPage')

const validateName = name => {
  if (name.length <= 3) {
    return { valid: false, error: "Имя должно быть больше 3х букв" };
  }
  return { valid: true, error: null };
};

const validatePhone = phone => {
  if (!phone.length) {
    return { valid: false,
            error: 'Заполните пустое поле' };
  }

  if (!phone.match(/^[+][(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/gm)) {
    return { valid: false, error: 'Введите корректный номер телефона начиная с символа +' };
  }

  return { valid: true, error: null };
};

const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: "Заполните пустое поле" };
  }
  if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)) {
    return { valid: false, error: "Введите корректный адерс почты" };
  }
  return { valid: true, error: null };
};

const validateRadio = radio => {
	if(!radio.length){
		return { valid: false, error: "Не выбран пол" };
	}
	if(radio.length){
		return { valid: true, error: null };
	}
	 
};
const validateCheckbox = check  => {
	if(!check){
		return { valid: false, error: "Подтвердите обязательное условие" };
	}
	if(check){
		return { valid: true, error: null };
	}
}
export default {
	data(){
    return {
      user: {
        email: '',
        name: '',
				phone: '+7',
				check:'',
				radio:''
      },
      valid: true,
      errors: {},
      message: null
    }
  },
  methods: {
		
    register() {
      this.errors = {}
      
      const validName = validateName(this.user.name);
      this.errors.name = validName.error;
      if (this.valid) {
        this.valid = validName.valid
      }
      
      const validPhone = validatePhone(this.user.phone);
      this.errors.phone = validPhone.error;
      if (this.valid) {
        this.valid = validPhone.valid
      }
      
      const validEmail = validateEmail(this.user.email);
			this.errors.email = validEmail.error;
      if (this.valid) {
        this.valid = validEmail.valid
			}
			const validRadio = validateRadio(this.user.radio);
			this.errors.radio = validRadio.error;
      if (this.valid) {
        this.valid = validRadio.valid
			}
			const validCheckbox = validateCheckbox(this.user.check);
			this.errors.check = validCheckbox.error;
      if (this.valid) {
        this.valid = validCheckbox.valid
			}
		},
		cislo(event){
			if (event.keyCode < 48 || event.keyCode > 57 ){
				event.returnValue= false;
			}
			if (event.keyCode == 8 ){
				event.returnValue= true;
			}
		},
		...mapActions([
				'onAddItem'
			])
	},
	components: {
		CreateModal
		}
}
</script>

<style lang="scss" scoped>
	.list {
		flex-direction: column;
	}
	.radiogroup	{
		display: flex;
		justify-content: center;
		align-items: center;
		input {
			height: 16px!important;
			width: 16px!important;
		}
		label {
			padding-right: 5px;
			padding-left: 5px;
		}
	}
	.checkbox {
		input {
			height: 16px!important;
			width: 16px!important;
		}
	}
</style>
