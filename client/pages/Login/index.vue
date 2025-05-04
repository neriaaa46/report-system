<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card width="400" class="pa-6 elevation-8">
      <v-card-title class="text-h5 text-center mb-4">Login</v-card-title>
      <v-form v-model="isValid" @submit.prevent="handleLogin">
        <v-text-field
            color="primary"
            variant="outlined"
            density="compact"
            class="mb-4"
            v-model.trim="email"
            label="Email"
            prepend-inner-icon="mdi-email"
            :rules="emailRules"
            type="email"
            required
        />
        <v-text-field
            color="primary"
            variant="outlined"
            density="compact"
            v-model.trim="password"
            label="Password"
            prepend-inner-icon="mdi-lock"
            :rules="passwordRules"
            type="password"
            required
        />

        <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            :disabled="!isValid || loading"
            block
            :loading="loading"
        >
          Login
        </v-btn>
      </v-form>

      <v-snackbar v-model="snackbar" color="primary" timeout="5000">
        {{ message }}
        <template v-slot:actions>
          <v-btn color="surface" variant="outlined" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/store'
import { useRouter } from 'vue-router'
import type {IAuth} from "~/types/types"

const email = ref<string>('')
const password = ref<string>('')
const isValid = ref<boolean>(false)
const loading = ref<boolean>(false)
const snackbar = ref<boolean>(false)
const message = ref<string>('')
const router = useRouter()
const store = useStore()

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
]

const handleLogin = async () => {
  loading.value = true

  try {
    const res: IAuth = await $fetch(`${store.apiBaseURL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: {email: email.value, password: password.value}
    })

    store.setUser(res.user)
    await router.push('/')

  } catch (err:any) {
    console.log(err)
    snackbar.value = true
    message.value = err.response?._data?.message || 'Login failed'

  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
