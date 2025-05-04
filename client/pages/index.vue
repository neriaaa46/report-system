<script setup lang="ts">
import {useStore} from "~/stores/store"
const store = useStore()
</script>

<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="700" class="pa-6 elevation-8 d-flex justify-space-between">
      <section>
        <h2 class="mb-3">Welcome to the Reports System</h2>
        <p class="mb-10">View and manage your work report with ease.</p>
        <NuxtLink v-if="!store.isLoggedIn" to="/Login">
          <p><b>Sign-in</b> to get started</p>
        </NuxtLink>

        <article v-else>
          <p class="mb-4">Hello, {{store.fullName}}</p>
          <v-btn @click="navigateTo('/Reports')" color="primary">Go To Reports</v-btn>
        </article>
      </section>

      <section class="welcome-img">
        <img src="/welcome_report.png" alt="logo" width="200">
      </section>
    </v-card>
  </v-container>
</template>

<style scoped>
@media (max-width: 720px) {
  .welcome-img {
    display: none;
  }
}
</style>