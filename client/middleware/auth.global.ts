import { useStore } from '~/stores/store'

export default defineNuxtRouteMiddleware((to) => {
    const store = useStore()

    if (!store.isLoggedIn) {
        const publicPages = ['/', '/Login']
        if (!publicPages.includes(to.path)) {
            return navigateTo('/Login')
        }
    }
})
