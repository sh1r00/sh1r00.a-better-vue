<template>
  <v-container>
    <v-layout>
      <v-form
        autocomplete="off"
        @submit.stop.prevent="handleSubmit">
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

          <v-btn
            :disabled="loading"
            type="submit"
            primary>
            Submit
          </v-btn>

          <p>
            No account?
          </p>

          <v-btn
            :to="{ name: 'signup'}"
            flat>
            Register
          </v-btn>
        </v-input-group>
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
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.login(this.email, this.password)
        this.loading = false
        this.setUser(response.user)
        this.$router.go(-1)
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
