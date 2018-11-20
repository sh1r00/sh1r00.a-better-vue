<template>

  <v-container>
    <v-layout
      row>
      <v-btn
        color="pink"
        dark
        style="width:50px"
        justify-center
        @click.stop="drawer = !drawer"
      >
        Toggle
      </v-btn>
    </v-layout>

    <v-navigation-drawer
      stateless
      clipped
      temporary
      left>

      <v-divider />

      <v-list
        dense
        class="pt-0">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click.stop="drawer = !drawer"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-container>

</template>

<script>
  export default {
        name: "VuetifyNavDrawer",
      data () {
        return {
          drawer: null,
          items: [
            { title: 'Home', icon: 'dashboard' },
            { title: 'About', icon: 'question_answer' }
          ]
        }
      }
    }
</script>

<style scoped>

</style>
