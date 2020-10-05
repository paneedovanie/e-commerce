<template>
  <v-app>
    <default-appbar />

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container>

        <!-- If using vue-router -->
        <nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer app>
      
    </v-footer> -->
  </v-app>
</template>

<script>

export default {
  components: {
    defaultAppbar: () => import('./partials/defaultAppbar')
  },

  data: () => ({
    
  }),

  mounted() {
    if(localStorage.getItem('user')) {
      this.$router.push({path: '/login', query: { from: this.$route.fullPath }})
    }
  }
}
</script>
