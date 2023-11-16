<template>
<transition name="modalbg">
    <div @click.self="closeModal" class="modal_container">
        <transition name="modal" v-on:before-leave="modalClose">
        <div v-if="showed" class="modal">
            <div class="caption">
                <div class="title-modal">{{textContent.titleAdd}}</div>
                <div @click="closeModal" class="close"></div>
            </div>
            <div class="modal-scroll">
                <div class="modal-content">
                    <form v-on:submit.prevent="onAddItem">
                        <form>
                            <div class="form-group" :class="{invalid: fields.title.errorId}">
                                <input type="text"
                                    :placeholder="fields.title.name"
                                    v-model="fields.title.value"
                                    @blur="isEmpty('title')"
                                   @keydown="removeError('title')">
                                <label :class="{ 'filled' : fields.title.value }">{{fields.title.name}}</label>
                                <div class="invalid_text">{{fields.title.errors[fields.title.errorId]}}</div>
                                <span class="line"></span>
                            </div>
                        </form>
                        <form>
                            <div class="form-group" :class="{invalid: fields.value.errorId}">
                                <input type="text"
                                    :placeholder="fields.value.name"
                                    v-model="fields.value.value"
                                    @blur="isEmpty('value')"
                                    @keydown="removeError('value')">
                                <label :class="{ 'filled' : fields.value.value }">{{fields.value.name}}</label>
                                <div class="invalid_text">{{fields.value.errors[fields.value.errorId]}}</div>
                                <span class="line"></span>
                            </div>
                        </form>
                    </form>
                </div>
            </div>
            <div class="buttons">
                <div class="next">
                    <button @click="closeModal" class="cancel">{{textContent.cancelButton}}</button>
                    <button class="confirm" @click="onAddItem">{{textContent.submitButton}}
                    </button>
                </div>
            </div>
        </div>
        </transition>
    </div>
</transition>
</template>

<script>
    import IconAlignleft from '@/components/icons/IconAlignleft'
    import IconSignalbars from '@/components/icons/IconSignalbars'
    import FormInput from '@/components/create-form/Input'
    import {createNamespacedHelpers} from 'vuex'
    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('interfacePage')

    export default {
        data() {
            return {
                fields: [],
                isError: false,
                showed: false
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'url'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapMutations([
                'setIsAdd'
            ]),
            ...mapActions([
                'getFields',
                'addItem'
            ]),
            removeError(name) {
                if(!this.fields[name].value) {
                    this.fields[name].errorId = null
                }
            },
            isEmpty(name) {
                if(!this.fields[name].value && !this.fields[name].isNullable) {
                    this.fields[name].errorId = 'empty'
                }
            },
            modalClose() {
                this.setIsAdd(false)
            },
            closeModal() {
                this.showed = false;
            },
            checkFieldFilling() {
                let isError = false
                for (let key in this.fields) {
                    if (this.fields.hasOwnProperty(key)) {
                        if (this.fields[key].value) {
                            this.fields[key].errorId = null
                        } else {
                            if (!this.fields[key].isNullable) {
                                this.fields[key].errorId = 'empty'
                                isError = true
                            }
                        }
                    }
                }
                this.isError = isError
            },
            onAddItem() {
                this.checkFieldFilling()
                if (!this.isError) {
                     this.addItem({
                         value: this.fields.value.value,
                         title: this.fields.title.value,
                         interface_group_id: this.$route.params.groupId,
                         language_id: this.$store.state.language.id
                     })
                }
            }
        },
        mounted() {
            this.showed = true;
        },
        created() {
            this.fields = {
                title: {
                    value: '',
                    parameterName: 'title',
                    name: 'Название поля',
                    errorId: null,
                    errors: {empty: 'Введите название поля'},
                    tabId: 0
                },
                value: {
                    value: '',
                    parameterName: 'value',
                    name: 'Значение',
                    errorId: null,
                    errors: {empty: 'Введите значение'},
                    tabId: 0
                },
            }
        },
        components: {
            IconAlignleft,
            IconSignalbars,
            FormInput,
        }
    }
</script>

<style scoped>

</style>