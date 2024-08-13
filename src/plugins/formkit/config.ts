import { uk } from "@formkit/i18n"
import { defaultConfig } from "@formkit/vue"
import { rootClasses } from "./theme"

export default defaultConfig({
  locales: { uk },
  locale: "uk",
  config: {
    rootClasses,
  },
})
