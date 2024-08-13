import "@/assets/styles/tailwind.css"
import "@/assets/styles/components/n-list.css"

import { createApp } from "vue"

import App from "@/App.vue"

import { router } from "@/plugins/router"
import { plugin as formkitPlugin, config as formkitConfig } from "@/plugins/formkit"

const app = createApp(App)

app.use(router)
app.use(formkitPlugin, formkitConfig)

app.mount("#app")
