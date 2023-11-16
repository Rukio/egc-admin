<template>
    <div class="pdf">
        <div class="pdf-label">
            <p>PDF</p>
        </div>
        <div class="fields">
            <div :class="{ 'class-class' : isPdfError }" class="field-info">
              <PDFUploadInput @setError="pdfError($event)"/>
            </div>
            <div class="field-icon">
                <label>
                    <input type="file">
                    <icon-pdf class="pdf-icon"/>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import IconPdf from '@/components/icons/IconPDF.vue'
import PDFUploadInput from '@/components/edit-form/PDFUploadInput.vue'

export default {
		data() {
			return {
				isPdfError: false
			}
		},
		methods: {
			pdfError(isError) {
				if (isError) this.isPdfError = true
				else this.isPdfError = false
			}
		},
    components: {
        IconPdf,
        PDFUploadInput
    },
}
</script>

<style lang="scss" scoped>
$grey-6: #6e7074;
$white-3: #e4e8eb;
$green-2:#376d27;
$blue: #089cd3;
$pink-2: #f48787;

.field-info {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid $white-3;
    color: $grey-6;
    padding: 8px 37px 15px 0px;
    transition: .3s ease;
    &:hover {
      border-color: $blue;
    }
    &:focus {
        border-color: $green-2;
    }
}
.field-info{
  &:hover {
    border-color: $blue;
    & +.field-icon {
      transition: .3s ease;
      background-color: #ffffff;
      border: 1px solid $blue;
      svg {
        fill: $blue;
      }
    }
  }
}
.wrap-slash {
    margin: 0 16px;
}
.class-class{
	border-color: #f48787;
}
.pdf {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-label {
        color: $grey-6;
    }

    @media screen and (max-width: 1200px) {
        flex-wrap: wrap;
    }
}

.fields {
    display: flex;
    align-items: center;
    width: 70%;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
}

.field-info {
    position: relative;
    width: 87.547275%;
    height: 38px;

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
}

.field-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: $blue;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    transition: .3s ease;
    svg {
        fill: #fff;
        width: 20px;
        height: 16px;
    }
		&:hover{
      transition: .3s ease;
			background-color: #ffffff;
			border: 1px solid $blue;
			svg{
				fill: $blue;
			}
		}
}

.field-icon input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.field-icon label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 38px;
    height: 38px;
    border-radius: 50%;
}

</style>
