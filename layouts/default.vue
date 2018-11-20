<template>
  <v-app light>
    <v-container
      fluid>
      <NavToolbar />

      <v-content>
        <v-spacer />
        <ModalShopingCart />

        <v-spacer />

        <v-container>
          <nuxt />
        </v-container>

      </v-content>
      <FooterBasic />
    </v-container>
  </v-app>
</template>

<script>
  import NavToolbar from '../components/BaseNavToolbar'
  import ModalShopingCart from '../components/VuetifyModalShopingCart'
  import FooterBasic from '../components/BaseFooter'

  export default {
    components: {
      NavToolbar,
      FooterBasic,
      ModalShopingCart
    }
  }
</script>
