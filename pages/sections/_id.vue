<template>
  <v-container fluid>

    <v-text-field
      v-model="query"
      type="text"
      placeholder="Search..."
      centered/>

    <!--
    <v-layout>
      <v-flex
        xs12
        sm8
        md6>
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>
              Cart
            </v-toolbar-title>
          </v-toolbar>

          <v-card-body>
            <v-subheader>
              {{ numberOfItems }} items selected:
            </v-subheader>
            <v-list two-line>
              <template
                v-for="(item, index) in selectedItems">
                <v-list-tile
                  :key="item.id"
                  ripple>
                  <v-flex row>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ item.name }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title text--primary>
                        {{ item.quantity }}
                        <v-divider inset />
                        ${{ item.price }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-flex>
                  <v-flex row>
                    <v-list-tile-action>
                      <v-btn
                        success
                        depressed
                        flat
                        small
                        right
                        @click="addToCart(item)">
                        +
                      </v-btn>

                      <v-btn
                        warning
                        depressed
                        flat
                        small
                        right
                        @click="removeFromCart(item)">
                        -
                      </v-btn>
                    </v-list-tile-action>
                    <v-divider
                      v-if="index + 1 < selectedItems.length"
                      :key="`divider-${index}`" />
                  </v-flex>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-body>

          <v-card-footer>
            <v-toolbar>
              <v-toolbar-title v-if="selectedItems.length">
                Total: ${{ price }}
              </v-toolbar-title>

              <v-toolbar-title
                v-else-if="!selectedItems.length">
                Please select some items.
              </v-toolbar-title>

              <v-tile-action>
                <v-btn
                  :disabled="!selectedItems.length"
                  primary
                  @click="goToCheckout">
                  Order
                </v-btn>
              </v-tile-action>
            </v-toolbar>
          </v-card-footer>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider />
-->

    <v-layout
      wrap
      dark>

      <v-flex
        v-for="item in filteredList"
        v-bind="{ [`xs${item.flex}`]: true }"
        :key="item.id">

        <v-card>
          <v-card-title
            v-text="item.name"
          />

          <v-card-body>
            <v-img
              :src="item.image.url"
              height="200px"
            />

            <v-card-text>
              {{ item.description || 'No description provided' }}.
            </v-card-text>

            <v-card-text>
              {{ '$' + item.price || 'No description provided' }}.
            </v-card-text>

            <v-card-actions>
              <v-btn @click="addToCart(item)">
                add to cart
              </v-btn>

            </v-card-actions>
          </v-card-body>
        </v-card>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Strapi from 'strapi-sdk-javascript/build/main'
  const apiUrl = process.env.API_URL || 'http://localhost:1337'
  const strapi = new Strapi(apiUrl)

  export default {
    data() {
      return {
        query: '',
        complete: false
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      filteredList() {
        return this.items.filter(item => {
          return item.name.toLowerCase().includes(this.query.toLowerCase())
        })
      },
      items() {
        return this.$store.getters['items/list']
      }
    },

    async fetch({store, params}) {
      store.commit('items/emptyList')
      const response = await strapi.request('post', '/graphql', {
        data: {
          query: `query {
            section(id: "${params.id}") {
              _id
              name
              items {
                _id
                name
                description
                price
                image {
                  url
                }
              }
            }
          }
          `
        }
      })
      response.data.section.items.forEach(item => {
        item.image.url = `${apiUrl}${item.image.url}`
        store.commit('items/add', {
          id: item.id || item._id,
          ...item
        })
      })
    },
    methods: {
      ...mapMutations({
        addToCart: 'cart/add',
      })
    }
  }
</script>
<style scoped>

</style>
