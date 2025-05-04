import { useStore } from '~/stores/store'

export default defineNuxtRouteMiddleware((to) => {
    const store = useStore()

    if (!store.isLoggedIn) {
        const publicPages = ['/', '/login']
        if (!publicPages.includes(to.path)) {
            return navigateTo('/login')
        }
    }
})
