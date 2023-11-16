<template>
    <div :class="{ 'error-active' : isError }" class="profile-pdf">
      <label :class="{ 'download-true' : setActiveSt }" for="pdf-input">{{pdf.name}}</label>
			<input  class="pdf-input" type="file" @change="changeFile($event)">
			<p :class="{ 'error-active' : isError }" class="error-hint">Выберите файл верного формата</p>
    </div>
</template>

<script>
import IconUser from '@/components/icons/IconUser.vue'
import IconUpload from '@/components/icons/IconUpload.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

export default {

    data() {
        return {
            imgLoaded: false,
						isError: false,
						pdf: {name: "Выберите PDF файл"},
						photoPreview: null,
						setActiveSt: false
        }
    },
    methods: {
        getExtension(filename) {
            let parts = filename.split('.');
            return parts[parts.length - 1];
        },
        isImageFile(filename) {
            let ext = this.getExtension(filename);
            switch (ext.toLowerCase()) {
								case 'pdf':
										this.setActiveSt = true;
										return true;
										
            }
						return false;
						
        },
        changeFile(event) {
            this.pdf = event.target.files[0];
            if (this.pdf) {
								if (this.isImageFile(this.pdf.name)) 
								{
                    this.imgLoaded = true;
                    let reader = new FileReader();
                    let self = this;
										this.isError = false;
										this.$emit('setError', false)
                    reader.onload = function(event) {
                        self.photoPreview = event.target.result
                    }
                    reader.readAsDataURL(this.pdf);
                    let data = new FormData();
                    data.append('file', this.pdf);
                } else {
										this.isError = true;
										this.$emit('setError', true)
                }
            }
        },
        removePic() {
            if (this.imgLoaded) {
                this.pdf = null;
                this.photoPreview = null;
                this.imgLoaded = false;
                this.isError = false;
            }
        }
    },
    components: {
        IconUser,
        IconUpload,
        IconDelete
    }
}



</script>

<style lang="scss" scoped>

    $white: #fff;
    $grey-6: #6e7074;
    $grey-8: #46484d;
    $pink-2: #f48787;

    .profile-pdf{
			label{
					top: 0px;
					left: 0px;
					position: absolute;
					width: 100%;
					height: 100%;
					padding: 8px 0px 15px 15px;
					color: #999a9d;
				}
				input {
					opacity: 0;
					position: absolute;
					top: 0px;
					left: 0px;
				}
    }
	.error-hint {
		opacity: 0;
		position: absolute;
		margin: 30px 0px;
		font-size: 12px;
		color: $pink-2;
		}

    .error-active {
			opacity: 1;	
    }
		.error-active{
			label {
				color: #6e7074;
			}
		}
	.download-true{
		color: #6e7074!important;
	}
</style>
