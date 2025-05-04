import { defineStore } from 'pinia'
import type { IUser } from '~/types/types'

export const useStore = defineStore('userStore', {
    state: () => ({
        apiBaseURL: process.env.NODE_ENV  === 'development' ? 'http://localhost:3001' : 'https://report-system-usv2.onrender.com',
        isLoggedIn: false as boolean,
        userId: "" as string,
        email: "" as string,
        firstName: "" as string,
        isManager: false as boolean,
        lastName: "" as string,
        role: "" as string,
        manager: null as null | {
            firstName: string,
            lastName: string,
            role: string,
            managerId: string
        }
    }),
    getters: {
        fullName: (state) => `${state.firstName} ${state.lastName}`
    },
    actions: {
        logout() {
            this.$reset()
        },
        setUser(user: IUser) {
            this.isLoggedIn = true
            this.userId = user.userId
            this.email = user.email
            this.firstName = user.firstName
            this.lastName = user.lastName
            this.role = user.role
            this.isManager = user.isManager
            this.manager = user.manager
                ? {
                    firstName: user.manager.firstName,
                    lastName: user.manager.lastName,
                    role: user.manager.role,
                    managerId: user.manager.managerId
                }
                : null
        }
    }
})
