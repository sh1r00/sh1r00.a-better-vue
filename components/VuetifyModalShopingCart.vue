<template>
  <v-layout right>
    <v-badge
      fixed
      right
      color="red"
      overlap>
      <v-btn
        slot="badge"
        small
        fab
        color="light-grey"
        @click="dialog=!dialog"> {{ numberOfItems }}
        <v-icon
          large
          color="grey lighten-1">
          shopping_cart
        </v-icon>
      </v-btn>
    </v-badge>

    <v-layout
      class="text-xs-center"
      justify-center
      right
      app>
      <v-dialog
        v-model="dialog">
        <v-layout>
          <v-flex
            xs12
            sm8
            md6>
            <v-card>
              <v-toolbar dark>
                <v-btn
                  icon
                  dark
                  @click="dialog = false">
                  <v-icon>close</v-icon>
                </v-btn>

                <v-spacer />

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

                  <v-tile-action>
                    <v-btn
                      :disabled="!selectedItems.length"
                      primary
                      @click="goToCheckout">
                      Order
                    </v-btn>

                    <v-divider vertical />

                    <v-btn
                      color="blue darken-1"
                      flat
                      @click="dialog = false">
                      Close
                    </v-btn>
                  </v-tile-action>
                </v-toolbar>
              </v-card-footer>
            </v-card>
          </v-flex>
        </v-layout>
      </v-dialog>
    </v-layout>
  </v-layout>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
        name: "VuetifyModalShopingCart",
      data: () => ({
      dialog: false
    }),
      computed: {
          /**
        id() {
          return this.$route.params.id
        },
        items() {
          return this.$store.getters['items/list']
        },
           **/
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
      ...mapMutations({
        addToCart: 'cart/add',
        removeFromCart: 'cart/remove',
        emptyCart: 'cart/emptyList',
      }),
      goToCheckout(dialog) {
        // Redirect to signin page if not logged in.
        const isConnected = this.$store.getters['auth/username']
        if (!isConnected) {
          this.$router.push('/signin')
          return this.dialog = false
        }
        this.$router.push('/checkout')
        return this.dialog = false
      }
    }
    }
</script>

<style scoped>

</style>
