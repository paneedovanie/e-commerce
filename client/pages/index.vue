<template>
  <v-row>
    <v-col cols="12" md="6">
      <login />
    </v-col>
    <v-col cols="12" md="6">
      <register />
    </v-col>
  </v-row>
</template>

<script>
import api from '@/assets/api'
import axios from 'axios'

export default {
  components: {
    Login: () => import('@/components/cards/Login')
  },

  data: () => ({
  }),

  mounted() {
  }
}
</script>
