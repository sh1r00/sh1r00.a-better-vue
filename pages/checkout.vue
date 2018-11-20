<template>
  <v-container fluid>

    <h1 class="mt-2">Checkout</h1>

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
                        <span> {{ item.quantity }} </span>
                        <span> ${{ item.price }} </span>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-flex>
                  <v-flex wrap>
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
            </v-toolbar>
          </v-card-footer>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs3>

        <v-form
          autocomplete="off"
          @submit.stop.prevent="handleSubmit">
          <v-text-area
            id="address"
            v-model="address"
            label="Address"
            type="text"
            autofocus="true"
            placeholder="Enter your address"
            required/>

          <v-text-area
            id="postalCode"
            v-model="postalCode"
            label="PostalCode"
            type="text"
            autofocus="true"
            placeholder="Enter your postal code"
            required/>

          <v-text-area
            id="city"
            v-model="city"
            label="City"
            type="text"
            autofocus="true"
            placeholder="Enter your city"
            required/>

          <div
            class="form-group"
            style="width:100%; height:45px">

            <label for="card">
              Card
            </label>
            <card
              class="form-control"
              stripe="pk_test_SkFCsq5uRULpe8Vo9Pa4bvb9"/>
          </div>

          <v-btn
            :disabled="loading"
            type="submit">
            Submit
          </v-btn>
        </v-form>
      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>
  import { Card, createToken } from 'vue-stripe-elements-plus'
  import { mapMutations } from 'vuex'
  import Strapi from 'strapi-sdk-javascript/build/main'
  const apiUrl = process.env.API_URL || 'http://localhost:1337'
  const strapi = new Strapi(apiUrl)

  export default {
    components: {
      Card
    },
    data() {
      return {
        address: '',
        postalCode: '',
        city: '',
        loading: false
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      items() {
        return this.$store.getters['items/list']
      },
      selectedItems() {
        return this.$store.getters['cart/items']
      },
      price() {
        return this.$store.getters['cart/price']
      },
      numberOfItems() {
        return this.$store.getters['cart/numberOfItems']
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true
        let token
        try {
          const response = await createToken()
          token = response.token.id
        } catch (err) {
          alert('An error occurred.')
          this.loading = false
          return
        }
        try {
          await strapi.createEntry('orders', {
            amount: this.$store.getters['cart/price'],
            items: this.$store.getters['cart/items'],
            address: this.address,
            postalCode: this.postalCode,
            city: this.city,
            token
          })
          alert('Your order has been successfully submitted.')
          this.emptyCart()
          this.$router.push('/')
        } catch (err) {
          this.loading = false
          alert('An error occurred.')
        }
      },
      ...mapMutations({
        addToCart: 'cart/add',
        removeFromCart: 'cart/remove',
        emptyCart: 'cart/emptyList'
      })
    }
  }
</script>
