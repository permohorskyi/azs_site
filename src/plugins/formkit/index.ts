import { plugin, defaultConfig, createInput } from "@formkit/vue"

import formkitConfig from "./config"

import FormRGB from "@/components/formkit/FormRGB.vue"

const config = defaultConfig({
  ...formkitConfig,
  inputs: {
    rgb: createInput(FormRGB),
  },
})

export { plugin, config }
