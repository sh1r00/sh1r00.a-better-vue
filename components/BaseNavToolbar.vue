<template>
  <v-container fluid>
    <v-card flat>

      <v-layout
        row
        child-flex
        wrap>
        <div>
          <v-toolbar
            prominent
            expandable
            clipped-left
            scroll-off-screen
            dark>
            <v-toolbar-items>
              <Logo />
              <VuetifyLogo />
            </v-toolbar-items>

            <v-toolbar-title v-text="title" />
          </v-toolbar>
        </div>
      </v-layout>

      <v-layout>
        <v-spacer/>
        <div style="flex-basis: 20%">
          <v-toolbar>
            <v-toolbar-items
              v-if="!username"
              style="right: 0">

              <v-btn
                to="/signup"
                flat
                exact>
                Sign Up
              </v-btn>

              <v-divider vertical />

              <v-btn
                to="/signin"
                flat
                exact>
                Sign In
              </v-btn>
            </v-toolbar-items>

            <v-spacer />

            <v-toolbar-items
              v-if="username">

              <v-btn
                flat
                @click="logout">
                Log Out
              </v-btn>

              <v-divider vertical />

              <h3>
                Hello {{ username }}
              </h3>
            </v-toolbar-items>
          </v-toolbar>
        </div>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Logo from './Logo.vue'
  import VuetifyLogo from './VuetifyLogo.vue'

    export default {
      name: "BaseNavToolbar",
      components: {
        Logo,
        VuetifyLogo
      },
      data() {
        return {
          title: 'Welcome to the Web'
        }
      },
      computed: {
        username() {
          return this.$store.getters['auth/username']
        }
      },
      methods: {
        ...mapMutations({
          logout: 'auth/logout'
        })
      }
    }
</script>

<style scoped>

</style>
