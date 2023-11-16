<template>
    <div>
       <!-- <div class="subtitle subtitle1">
        <div class="modal_button">
            <button @click="onAddItem"><icon-add/>{{textContent.addItemText}}</button>
        </div>
       </div> -->
        <div class="edit_main" v-if="oldFields.length">
            <div class="folder radius_top">
                <language class="round-top hidden-on-sm" :flag="translateFrom.flag" :name="translateFrom.name"></language>
                <lang-switch class="round-top top-border-mobile" :languages="languages" :selected="translateTo" switch-id="dr-langs-2"></lang-switch>
            </div>
            <div class="folder edit-area">
                <div class="column round-bottom">
                    <div class="content">
                        <old-text v-for="(oldField, key) in oldFields" v-bind:key="key" :title="oldField.title" :name="key"></old-text>
                    </div>
                </div>
                <div class="column round-bottom">
                    <div class="content" v-if="showTexts">
                        <new-text v-for="(newField, key) in newFields" v-bind:key="key" :title="newField.title" :name="key"></new-text>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button class="save" @click="onSubmit">{{textContent.saveButton}}</button>
            </div>
        </div>
        <create-modal v-if="isAdd && isAdding"></create-modal>
    </div>
</template>

<script>
    import IconUpload from '@/components/icons/IconUpload'
    import NewText from '@/components/interface-form/new-items/Editor'
    import OldText from '@/components/interface-form/old-items/Editor'
    import Language from '@/components/Language'
    import LangSwitch from '@/components/LangSwitch'
    import {createNamespacedHelpers} from 'vuex'
    import IconAdd from '@/components/icons/IconAdd'
    import CreateModal from './CreateText'

    const {mapMutations, mapActions, mapState} = createNamespacedHelpers('interfaceText')
    export default {
        data: function () {
            return {
                ckeditor: null,
                text: ''
            }
        },
        props: {
            isAdding: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            ...mapState([
                'textContent',
                'translateFrom',
                'languages',
                'translateTo',
                'newFields',
                'oldFields',
                'copyFields',
                'commonFields',
                'isAdd',
                'errors',
                'interfaceGroup',
                'showTexts'
            ]),
            apiUrls() {
                return this.$store.state.apiUrls
            }
        },
        methods: {
            ...mapMutations([
                'setCommonFieldFileUrl',
                'setCommonField',
                'resetModule',
                'setFileExtensions',
                'setIsAdd'
            ]),
            ...mapActions([
                'init',
                'edit',
                'getFields'
            ]),
            onAddItem() {
                this.setIsAdd(true)
            },
            onLangChange(langId) {
                this.getFields(langId)
                //     .then(response => {
                //     this.ckeditor.setData(response.data.data.text)
                // })
            },
            onSubmit() {
                this.edit()
            }
        },
        created() {
            this.resetModule()
            this.init({
                textContent: {
                    cancelButton: 'Отмена',
                    saveButton: 'Сохранить',
                    greeting: 'Все изменения успешно сохранены',
                    addItemText: 'Добавить текст',
                    addGreeting: 'Текст успешно добавлен',
                    titleAdd: 'Добавить текст',
                    submitButton: 'Добавить текст'
                },
                itemId: this.$route.params.groupId,
                apiUrlId: 'text',
                commonFields: {}
            })
        },
        components: {
            NewText,
            OldText,
            Language,
            LangSwitch,
            IconUpload,
            IconAdd,
            CreateModal,
        }
    }
</script>

<style lang="scss" scoped>
$white-3: #e4e8eb;
$white-2: #f8f9fb;

    .edit_main .content /deep/ .article {
        & > p:first-child {
            background-color: $white-2;
            border-bottom: 1px solid $white-3;
            border-top: 1px solid $white-3;
            min-height: 52px;
            display: flex;
            align-items: center;
            margin-left: -18px;
            margin-right: -18px;
            padding: 0 18px;
        }

        &:not(:first-child) p:first-child {
            margin-top: 18px;
        }
    }

    .edit_main .content /deep/ .editor {
        .tittle {
            margin-left: -18px;
            margin-right: -18px;
            border-bottom: 1px solid $white-3;
            border-top: 1px solid $white-3;
        }

        & > .ck-editor {
            margin: 18px 0;
        }
    }

    .edit_main .content /deep/ .article > p:not(:first-child) {
        background-color: $white-2;
        border: 1px solid $white-3;
        padding: 15px;
        border-radius: 5px;
        margin-top: 18px;

        & > p:first-child {
            margin-top: 0;
        }
    }

    .edit_main .content /deep/ .article:first-child > p:first-child {
        margin-top: 0;
    }

    .edit_main .folder:first-child .column {
        border-bottom: none;
    }

    .edit_main .folder /deep/ .column .flag .dropdown label {
        height: 39px;
    }

    .edit_main .edit-area {
        .column {
            padding-top: 0;

            &:nth-child(2) {
                border-top: 1px solid $white-3;

                @media screen and (max-width: 1100px) {
                    margin-top: 18px;
                    border-radius: 5px !important;
                }
            }

            /deep/ .content > div:first-child {
                .tittle {
                    border-top: none;
                    border-radius: 5px 5px 0 0;
                }
            }

            /deep/ .article > p:first-child {
                @media screen and (max-width: 1100px) {
                    margin-left: -18px;
                    margin-right: -18px
                }
            }

            /deep/ .content .tittle {
                @media screen and (max-width: 1100px) {
                    margin-left: -22px;
                    margin-right: -22px;
                }
            }

            /deep/ .content .tittle,
            /deep/ .article > p:first-child {
                @media screen and (max-width: 500px) {
                    margin-left: -22px;
                    margin-right: -22px
                }
            }

            /deep/ .content .editor {
                
            }
        }
    }
</style>
