<script setup lang="ts">
import { useStore } from "~/stores/store"
import type {ICreateOrUpdateReport} from "~/types/types"
const store = useStore()

const props = defineProps<{
  reportId: string
  status: 'pending' | 'approved' | 'rejected'
}>()
const emit = defineEmits<{
  updateReport: [reportId: string, status: 'pending' | 'approved' | 'rejected']
}>()

const snackbar = ref<boolean>(false)
const message = ref<String>('')

const loading = reactive<{ approved: boolean; rejected: boolean}>({
  approved: false,
  rejected: false,
})

const showSnackbar = (text: string) => {
  message.value = text
  snackbar.value = true
}

const report = async (type: 'approved' | 'rejected') => {
  try {
    loading[type] = true
    const res: ICreateOrUpdateReport = await $fetch(`${store.apiBaseURL}/api/reports/updateReport/${props.reportId}`, {
      method: 'PUT',
      credentials: 'include',
      body: { status: type },
    })

    showSnackbar("The report has been " + type)
    emit('updateReport', props.reportId, res.report?.status as 'pending' | 'approved' | 'rejected')

  } catch (error) {
    console.error(error)
    showSnackbar("Error updating report")

  } finally {
    loading[type] = false
  }
}
</script>

<template>
  <div>
    <template v-if="props.status === 'pending'">
      <v-btn size="small"
          color="success"
          class="mr-5"
          :loading="loading.approved"
          :disabled="loading.approved || loading.rejected"
          @click="report('approved')"
      >
        Approve
      </v-btn>

      <v-btn
          size="small"
          color="red"
          :loading="loading.rejected"
          :disabled="loading.approved || loading.rejected"
          @click="report('rejected')"
      >
        Reject
      </v-btn>
    </template>

    <template v-else>
      <v-chip :color="props.status === 'approved' ? 'success' : 'red'" class="text-white">
        {{ props.status }}
      </v-chip>
    </template>

    <v-snackbar v-model="snackbar" color="primary" timeout="5000">
      {{ message }}
      <template v-slot:actions>
        <v-btn color="surface" variant="outlined" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
