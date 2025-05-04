<script setup lang="ts">
import { useStore } from '~/stores/store'
const store = useStore()

const logout = async () => {
  const store = useStore()

  try {
    await $fetch(`${store.apiBaseURL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    store.logout()
    await navigateTo('/')
  } catch (err) {
    console.error('Logout failed:', err)
  }
}
</script>

<template>
  <v-app-bar color="primary" density="compact" elevation="5">
    <v-app-bar-title @click="navigateTo('/')">Reports System</v-app-bar-title>

    <v-btn v-if="store.isLoggedIn" @click="logout" append-icon="mdi-logout-variant">
      <template v-slot:prepend>
        <v-icon></v-icon>
      </template>
      Logout
    </v-btn>

    <v-btn v-else @click="navigateTo('/Login')" append-icon="mdi-account-circle">
      <template v-slot:prepend>
        <v-icon></v-icon>
      </template>
      Login
    </v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>