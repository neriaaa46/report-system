import type { IAuth } from "~/types/types"
import { useStore } from "~/stores/store"

export default defineNuxtPlugin(async () => {
    const store = useStore()

    try {
        const res: IAuth = await $fetch(`${store.apiBaseURL}/api/auth/validate`, {
            credentials: 'include',
        })
        store.setUser(res.user)

    } catch (err) {
        console.log('No active session', err)
    }
})