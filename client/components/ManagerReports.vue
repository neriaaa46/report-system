<script setup lang="ts">
import {getTodayDate} from "~/utils/date"
import { useStore } from "~/stores/store"
import type {IEmployeesReports, IReport} from "~/types/types"
import {formatDate} from "~/utils/date"
const store = useStore()

const loading = ref<boolean>(false)
const reports = ref<IReport[]>([])
const headers = [
  { title: 'Name', key: 'employeeId.firstName' },
  { title: 'Date', key: 'date' },
  { title: 'Start Time', key: 'clockIn' },
  { title: 'End Time', key: 'clockOut' },
  { title: '', key: 'reportButtons', sortable: false },
]

const getSubmittedReports = async () => {
  try {
    loading.value = true
    const res: IEmployeesReports = await $fetch(`${store.apiBaseURL}/api/reports/employeesReports`, {
      credentials: 'include',
      query: {
        date: getTodayDate(),
      }
    })

    reports.value = res.reports

  } catch (error) {
    console.error('Failed to fetch reports:', error)

  } finally {
    loading.value = false
  }
}

const updateStatusReport = (id: string, status: 'pending' | 'approved' | 'rejected') => {
  reports.value.forEach(report => {
    if(report._id === id)
      report.status = status
  })
}

onMounted(async () => {
 await getSubmittedReports()
})

</script>

<template>
  <section class="mt-10">
    <v-card flat elevation="3">
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-checkbox-multiple-marked-circle" color="primary"></v-icon>
        Submitted Reports
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="reports" :loading="loading">
        <template v-slot:item.employeeId.firstName="{ item }">
          {{ item.employeeId?.firstName }} {{ item.employeeId?.lastName }}
        </template>

        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>

        <template v-slot:item.reportButtons="{ item }">
         <ManagerReportButtons @updateReport="updateStatusReport" :reportId="item._id" :status="item.status"/>
        </template>

        <template v-slot:footer.prepend>
          <v-btn size="small" class="mr-5" color="primary" @click="getSubmittedReports">
            <v-icon icon="mdi-refresh"></v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </section>
</template>

<style scoped>
</style>