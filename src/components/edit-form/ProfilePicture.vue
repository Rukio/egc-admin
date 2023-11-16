<template>
    <div :class="{ 'pic-error' : isError }" class="profile-picture">
        <div  class="hoverplate">
            <div :class="{ 'has-pic' : imgLoaded }" class="pic-container">
                <img v-if="imgLoaded" class="pic-uploaded" :src="photoPreview" alt="Avatar">
                <img v-else class="pic-uploaded" src="@/assets/img1-min.png" alt="Avatar">
            </div>
            <div class="icons">
                <label class="icon upload">
                    <icon-upload class="icon-svg upload-icon"/>
                    <input class="pic-input" type="file" @change="changeFile($event)">
                    <p class="hint-label upload-hint">Изменить</p>
                </label>
                <div v-if="imgLoaded" @click="removePic" class="icon delete">
                    <icon-delete class="icon-svg delete-icon"/>
                    <p class="hint-label delete-hint">Удалить</p>
                </div>
            </div>
            <p :class="{ 'error-active' : isError }" class="hint-label error-hint">Неверный формат</p>
        </div>
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
            photo: [],
            photoPreview: null
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
                case 'jpg':
                case 'gif':
                case 'png':
                case 'jpeg':
                    return true;
            }
            return false;
        },
        isSizeValid(size) {
            if (size > 5120000)
            return false
            else
            return true
        },
        changeFile(event) {
            this.photo = event.target.files[0];
            if (this.photo) {
                if (this.isImageFile(this.photo.name)
                && this.isSizeValid(this.photo.size)) {
                    this.imgLoaded = true;
                    let reader = new FileReader();
                    let self = this;
                    this.isError = false;
                    reader.onload = function(event) {
                        self.photoPreview = event.target.result
                    }
                    reader.readAsDataURL(this.photo);
                    let data = new FormData();
                    data.append('file', this.photo);
                } else {
                    this.isError = true;
                }
            }
        },
        removePic() {
            if (this.imgLoaded) {
                this.photo = null;
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

    .profile-picture {
        width: 104px;
        height: 104px;
        border: 2px solid transparent;
        border-radius: 50%;
    }

    .hoverplate {
        width: 100%;
        height: 100%;
        position: relative;

        &:hover {
            .icons {
                opacity: 1;
            }
        }
    }

    .pic-error {
        border-color: $pink-2;
    }

    .pic-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid transparent;

        .pic-uploaded {
            max-width: 100%;
            object-fit: cover;
        }

        &.has-pic {
            border: 1px solid #e4e8eb;
        }
    }

    .icons {
        border-radius: 50%;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        opacity: 0;
        transition: .3s;

        .icon {
            margin: 0 6px;
            cursor: pointer;
            position: relative;

            .icon-svg {
                color: rgba($white, .6);
                transition: .3s;
                vertical-align: middle;
            }

            &:hover {
                .icon-svg {
                    color: rgba($white, 1);
                }
            }
        }
    }

    .icon:hover .hint-label {
        opacity: 1;
        transform: translate(-50%, 0);
        transition-delay: .3s;
    }

    .hint-label {
        display: inline-block;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transition: .2s;
        transform: translate(-50%, -100%);
        padding: 4px 10px;
        font-size: 13px;
        border-radius: 3px;
        color: $white;
        background: rgba($grey-8, .9);
        white-space: nowrap;
        backface-visibility: hidden;

        &:before {
            content: '';
            position: absolute;
            top: -10px;
            left: calc(50% - 5px);
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent rgba($grey-8, .9) transparent;
        }
    }

    .hint-label.error-hint {
        top: calc(100% + 7px);
    }

    .error-active {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    .pic-input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

</style>
