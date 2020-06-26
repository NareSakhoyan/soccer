<template>
    <div class="homepage">
        <div class="container">
            <section v-if="isLoading">
                <b-loading :is-full-page=true :active.sync="isLoading"  :can-cancel="true"></b-loading>
            </section>
            <div class="columns">
                <div class="column is-4">
                    <form @submit="apply" v-if="!isLoading">
                        <b-field label="Html tags: " class="level-item">
                            <b-field name="htmlTag" @submit="setComponentData">
                                <b-select placeholder="Choose..." name="selectTag" @blur="setComponentData">
                                    <option
                                            v-for="(i, index) in tagNames"
                                            :value="i.id_html_tags"
                                            :key="`${index}}`">
                                        {{i.value}}
                                    </option>
                                </b-select>
                                <b-input name="tagValue" @blur="setComponentData"/>
                            </b-field>
                        </b-field>

                        <b-field name="cssAttribute" label="Css attributes: " class="level-item" @submit="setComponentData">
                            <b-field>
                                <b-select placeholder="Choose..." name="selectCssAttribute" @blur="setComponentData">
                                    <option
                                            v-for="(i, index) in cssAttributes"
                                            :value="i.id_css"
                                            :key="`${index}}`">
                                        {{i.value}}
                                    </option>
                                </b-select>
                                <b-input name="cssAttributeValue" @blur="setComponentData"/>
                            </b-field>
                            <b-button native-type="submit">Add</b-button><!--                        make that add button add new field and value-->

                        </b-field>


                        <b-field label="Html attributes: " class="level-item">
                            <b-field name="attribute">
                                <b-select placeholder="Choose..." name="selectAttribute" @blur="setComponentData">
                                    <option
                                            v-for="(i, index) in attributeName"
                                            :value="i.id_html_tag_attributes"
                                            :key="`${index}}`">
                                        {{i.value}}
                                    </option>
                                </b-select>
                                <b-input name="attributeValue" @blur="setComponentData"/>
                            </b-field>
                        </b-field>
                        <b-button class="is-outlined is-success-passive apply level-item" >apply</b-button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "HomePage",
        data() {
            return {
                methodNumber: 0,
                needToBeCalled: [
                    ['/html', 'tagNames'],
                    ['/html/attributes', 'attributeName'],
                    ['/html/values', 'cssValues'],
                    ['/css/attributes', 'cssAttributes'],
                    ['/css/values', 'cssValues'],
                ],
                arrName: '',
                tagNames: [],
                cssAttributes: [],
                cssValues: [],
                css: [],
                attributes: [],
                attributeName: [],
                attributeValue: [],
                component: {
                    htmlTag: '',
                    htmlValue: '',//or it may be another htmltag
                    css: [],
                    attributes: []
                }
            }
        },
        computed: {
            isLoading() {
                return this.$store.state.isLoading
            }
        },
        watch: {
            isLoading(to, from) {
                if (from && !to){//time when data is loading
                    this[this.arrName] = JSON.parse(JSON.stringify(this.$store.state[this.arrName]))
                    if (this.methodNumber !== this.needToBeCalled.length) {
                        this.getData()
                    }
                }
            }
        },
        methods: {
            ...mapActions(['setDataUrl', 'setDataArrName', 'getDataFromApi']),
            ...mapGetters(['getCode']),
            setComponentData(elem) {
                console.log(9999999999999999999999999);
                let value = elem.target.value
                if (!value) return;
                let name = elem.target.name
                console.log(name, value)
                // if (name.substr(0, 6) === 'select') {
                //     let arrName = name === 'cssAttributeValue'? 'css': 'attributes';
                //     this.component[arrName]
                // } else {
                //     if (name === 'tagValue') {//make work for new html element
                //         this.component['tagValue'] = value
                //     } else {//get property code
                //         let arrName = name === 'cssAttributeValue'? 'css': 'attributes';
                //         this.component[arrName].push({name: value})
                //         this.getCode(arrName, )
                //     }
                // }

                console.log(elem.target)

                // if (name === 'tagValue') {//make work for new html element
                //     this.component['tagValue'] = value
                // } else {//get property code
                //     let arrName = name === 'cssAttributeValue'? 'css': 'attributes';
                //     this.component[arrName].push({name: value})
                //     this.getCode(arrName, )
                // }

                console.log(this.component)
            },
            apply() {
                // this.component: {
                //     htmlTag: '',
                //         htmlValue: '',//or it may be another htmltag
                //         css: [],
                //         attributes: []
                // }
            },
            getData() {
                let currentCall = this.needToBeCalled[this.methodNumber]
                let url = currentCall[0]
                let arrName = currentCall[1]
                this.setDataUrl(url)
                this.setDataArrName(arrName)
                this.getDataFromApi()
                this.arrName = arrName
                ++this.methodNumber
            }
        },
        mounted() {
            this.getData()
        },
    }
</script>

<style scoped>
    .apply {
        margin: 0 0 0 20px;
    }
</style>