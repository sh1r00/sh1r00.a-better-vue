<template>
  <v-container>
    <v-layout
      col-md-6
      offset-md-3
      mt-3>
      <v-form
        autocomplete="off"
        @submit.stop.prevent="handleSubmit">
        <v-input-group>
          <v-text-field
            id="username"
            v-model="username"
            label="username"
            type="username"
            autofocus
            placeholder="Enter your username"
            required/>
        </v-input-group>
        <v-input-group>
          <v-text-field
            id="email"
            v-model="email"
            label="email"
            type="email"
            autofocus
            placeholder="Enter your email"
            required/>
        </v-input-group>
        <v-input-group>
          <v-text-field
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="form-control"
            autofocus
            placeholder="Enter your password"
            required/>
        </v-input-group>
        <v-btn
          :disabled="loading"
          type="submit"
          primary>
          Submit
        </v-btn>
        <p>
          Already have an account?
          <router-link
            :to="{ name: 'signin'}"
            tag="a">
            Login
          </router-link>
        </p>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        )
        this.loading = false
        this.setUser(response.user)
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>
