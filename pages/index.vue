<template>
  <v-container fluid>

    <v-text-field
      v-model="query"
      type="text"
      placeholder="Search..."/>

    <v-layout
      wrap
      dark>

      <v-flex
        v-for="section in filteredList"
        v-bind="{ [`xs${section.flex}`]: true }"
        :key="section.id">

        <v-card>
          <v-card-title
            v-text="section.name"
          />

          <v-card-text>
            {{ section.description || 'No description provided' }}.
          </v-card-text>

          <v-card-body>
            <v-img
              :src="section.image.url"
              height="200px"
            />
          </v-card-body>

          <v-card-footer>
            <v-card-actions>
              <v-btn
                :to="{ name: 'sections-id', params: { id: section.id }}"
                primary>
                See items
              </v-btn>
            </v-card-actions>
          </v-card-footer>

          <p v-if="!filteredList.length">No results :(</p>

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredList() {
      return this.sections.filter(section => {
        return section.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
    sections() {
      return this.$store.getters['sections/list']
    }
  },
  async fetch({ store }) {
    store.commit('sections/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
            sections {
              _id
              name
              description
              image {
                url
              }
            }
          }
          `
      }
    })
    response.data.sections.forEach(section => {
      section.image.url = `${apiUrl}${section.image.url}`
      store.commit('sections/add', {
        id: section.id || section._id,
        ...section
      })
    })
  }
}

</script>
