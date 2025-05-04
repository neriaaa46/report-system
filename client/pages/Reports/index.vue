<script setup lang="ts">
import { useStore } from "~/stores/store"
import ManagerReports from "~/components/ManagerReports.vue"

const store = useStore()
</script>

<template>
  <v-container>
    <v-card class="pl-8 pt-4 pb-4 pr-8 elevation-8">
      <ReportForm></ReportForm>
      <ManagerReports v-if="store.isManager"></ManagerReports>
    </v-card>
  </v-container>
</template>

<style scoped>

</style>