import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#f1e9ff',
        surface: '#FFFFFF',
        primary: '#5100c5',
        secondary: '#03DAC6',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'myCustomLightTheme',
            themes: {
                myCustomLightTheme,
            },
        },
    })
    app.vueApp.use(vuetify)
})