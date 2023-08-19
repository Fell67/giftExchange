import "@/assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/App.vue"

// Plugins
import Vuetify from "@/plugins/vuetify.js"

const pinia = createPinia()
const app = createApp(App)

// Use pinia stores
app.use(pinia)

// Plugins to use
app.use(Vuetify)

app.mount("#app")

