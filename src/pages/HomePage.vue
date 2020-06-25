<template>
    <div class="homepage">
        <div class="container">
            <b-field label="Html Tags">
                <b-select placeholder="Select...">
                    <option v-for="i in htmlTags" :name="i.id_html_tags" :value="i.id_html_tags" :key="i.id_html_tags">{{tag-name}}</option>
                </b-select>
            </b-field>
            <b-field label="Simple">
                <b-select placeholder="Select a name">
                    <option>asd</option>
                    <option>asd</option>
                    <option>asd</option>
                    <option>asd</option>
                </b-select>
            </b-field>

        </div>
    </div>
</template>

<script>
    export default {
        name: "HomePage",
        data() {
            return {
                htmlTags: this.getHtml()
            }
        },
        methods: {
            async getHtml() {
                let response = await this.$api.get('/html')
                console.log(2, response.data)
                return response.data
            }
        },
        mounted() {
          console.log(1, this.htmlTags)
        }
    }
</script>

<style scoped>

</style>