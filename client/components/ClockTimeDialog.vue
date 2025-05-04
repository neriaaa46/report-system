<script setup lang="ts">

interface Props {
  type: 'in' | 'out' | null
  referenceTime: string
  initialTime: string
}
const dialogVisible = defineModel<boolean>()
const props = defineProps<Props>()
const emit = defineEmits(['save', 'cancel'])

const localTime = ref(props.initialTime)
const requiredRule = [(v: string) => !!v || 'This field is required']

watch(dialogVisible, (val) => {
  if (val) {
    localTime.value = props.initialTime
  }
})

function close() {
  emit('cancel', false)
}

function save() {
  emit('save', localTime.value)
  close()
}

const isTimeValid = computed(() => {
  if (!localTime.value || !props.referenceTime) return true

  const [inputH, inputM] = localTime.value.split(':').map(Number)
  const [refH, refM] = props.referenceTime.split(':').map(Number)

  const inputTotal = inputH * 60 + inputM
  const refTotal = refH * 60 + refM

  return props.type === 'in' ? inputTotal < refTotal : inputTotal > refTotal
})

const isSaveDisabled = computed(() => {
  return !localTime.value || !isTimeValid.value
})
</script>

<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <v-card>
      <v-card-title>
        {{ type === 'in' ? 'Clock In Time' : 'Clock Out Time' }}
      </v-card-title>

      <v-card-text>
        <v-text-field
            v-model="localTime"
            label="Select Time"
            type="time"
            variant="outlined"
            density="compact"
            :rules="requiredRule"
            required
        />

        <v-alert
            v-if="!isTimeValid"
            type="error"
            variant="outlined"
            class="mt-2"
            density="compact"
        >
          {{ type === 'in'
            ? 'Clock-in time must be before the Clock-out time.'
            : 'Clock-out time must be after the Clock-in time.'
          }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="close">Cancel</v-btn>
        <v-btn color="primary" :disabled="isSaveDisabled" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>