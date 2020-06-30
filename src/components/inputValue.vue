<template>
        <b-field>
            <b-select @input="func" :value="cssAttribute" placeholder="Choose..." name="selectCssAttribute">
                <option
                        v-for="(i, index) in cssAttributes"
                        :value="`${i.id_cssAttributes}.${cssAttributesIndex}`"
                        :key="`${index}`">
                    {{i.value}}
                </option>
            </b-select>
            <b-input @input="func" :value="cssValue" name="cssAttributeValue"/>
        </b-field>

</template>

<script>
    export default {
        name: "inputValue",
        props: {
            value: {
                default: 456
            },
            cssAttribute: {
                default: ''
            },
            cssValue: {
                default: ''
            },
        },
        data() {
            return {
                cssAttributesIndex: 0,
                cssAttributes: [],
            }
        },
        computed: {
            parentThis() {
                return this.$parent
            },
        },
        methods: {
            func(e) {
                console.log(e.target? e.target.value: e)
                this.$emit('input', e.target? e.target.value: e)
                // this.$emit('input', e.target.value)
            },
        },
        mounted() {
            this.cssAttributesIndex = this.parentThis? this.parentThis.cssAttributesIndex: 0
            this.cssAttributes = this.parentThis? this.parentThis.cssAttributes: []
        }

    }
</script>

<style scoped>

</style>