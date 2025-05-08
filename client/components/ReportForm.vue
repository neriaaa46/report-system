<script setup lang="ts">
import {computed, ref} from "vue"
import {useStore} from "~/stores/store"
import ClockTimeDialog from "~/components/ClockTimeDialog.vue"
import type {ICreateOrUpdateReport, IReport} from "~/types/types"
import {formatDate, getTodayDate} from "~/utils/date"

const store = useStore()

const report = ref<IReport | null>(null)
const clockInTime = ref<string>("")
const clockOutTime = ref<string>("")
const dialogVisible = ref<boolean>(false)
const dialogType = ref<'in' | 'out' | null>(null)
const snackbar = ref<boolean>(false)
const message = ref<String>("")
const loading = ref<boolean>(false)

const isClockOutDisabled = computed(() => !clockInTime.value)


function openDialog(type: 'in' | 'out') {
  dialogType.value = type
  dialogVisible.value = true
}

function showSnackbar () {
  message.value = dialogType.value === 'in'
      ? 'Clock-in time was updated successfully'
      : 'Clock-out time was updated successfully'
  snackbar.value = true
}

async function handleSave(newTime: string) {
  if (dialogType.value === 'in') {
    clockInTime.value = newTime

    if (!report.value) {
      await createReport(newTime)

    } else {
      await updateReport('in', newTime)
    }

  } else if (dialogType.value === 'out') {
    clockOutTime.value = newTime
    await updateReport('out', newTime)
  }

  dialogVisible.value = false
}

async function fetchTodayReport() {
  const date = getTodayDate()

  try {
      loading.value = true
      const res: IReport = await $fetch(`${store.apiBaseURL}/api/reports/getReport`, {
        credentials: 'include',
        query: {date}
      })

      if (res) {
        clockInTime.value = res.clockIn || ""
        clockOutTime.value = res.clockOut || ""
        report.value = res

      } else {
        report.value = null
      }

  } catch (error:any) {
      console.error('Error fetching report:', error)

  } finally {
    loading.value = false
  }
}

async function createReport(time: string) {
  try {
    const res: ICreateOrUpdateReport = await $fetch(`${store.apiBaseURL}/api/reports/addReport`, {
      method: 'POST',
      body: {clockIn: time},
      credentials: 'include',
    })
    report.value = res.report
    showSnackbar()

  } catch (error) {
    console.error('Failed to create report:', error)
  }
}

async function updateReport(type: 'in' | 'out', time: string) {
  const payload: any = {}
  if (type === 'in') payload.clockIn = time
  if (type === 'out') payload.clockOut = time

  try {
    const res: ICreateOrUpdateReport = await $fetch(`${store.apiBaseURL}/api/reports/updateReport/${report.value?._id}`, {
      method: 'PUT',
      body: payload,
      credentials: 'include',
    })
    report.value = res.report
    showSnackbar()

  } catch (error:any) {
    console.error('Failed to update report:', error)
    if(error.response?.status === 403) {
      message.value = "You can't update the report after it was approved or rejected"
      snackbar.value = true
    }
  }
}

onMounted(async () => {
  await fetchTodayReport()
})
</script>

<template>
  <h2 class="mb-6">Employee Details</h2>
  <section class="mb-10">
    <ul class="details">
      <li><strong>First Name:</strong> {{ store.firstName }}</li>
      <li><strong>Last Name:</strong> {{ store.lastName }}</li>
      <li><strong>Job Title:</strong> {{ store.role }}</li>
      <li v-if="store.manager">
        <strong>Manager:</strong>
        {{ store.manager?.firstName }} {{ store.manager?.lastName }}
      </li>
    </ul>
  </section>

  <section class="report-section">
    <p v-if="loading">Loading...</p>

    <template v-else>
      <article v-if="report?.status === 'approved' || report?.status === 'rejected'">
        <h3 class="mb-2">Report</h3>
        <template class="report-details">
          <span><strong>Date:</strong> {{formatDate(report.date)}}</span>
          <span><strong>Clock-in:</strong> {{report.clockIn}}</span>
          <span><strong>Clock-Out:</strong> {{report.clockOut}}</span>
          <span><strong>Status:</strong> {{report.status}}</span>
        </template>
      </article>

      <article v-else>
        <v-btn class="mr-4" color="primary" @click="openDialog('in')">Clock In</v-btn>
        <v-btn color="primary" :disabled="isClockOutDisabled" @click="openDialog('out')">Clock Out</v-btn>
      </article>
    </template>
  </section>


  <ClockTimeDialog
      v-model="dialogVisible"
      :type="dialogType"
      :initialTime="dialogType === 'in' ? clockInTime : clockOutTime"
      :referenceTime="dialogType === 'in' ? clockOutTime : clockInTime"
      @save="handleSave"
      @cancel="dialogVisible = false"
  />

  <v-snackbar v-model="snackbar" color="primary" timeout="5000">
    {{ message }}
    <template v-slot:actions>
      <v-btn color="surface" variant="outlined" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.details {
  max-width: 400px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 20px;
  padding: 0;
  margin: 0;
}
.report-details {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.report-section {
  height: 80px;
}
</style>
