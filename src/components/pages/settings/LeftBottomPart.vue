<template>
  <div class="box-content flex flex-col gap-2 px-5 py-3">
    <n-button
      v-for="[key, section] in Object.entries(sections)"
      :key="key"
      size="large"
      :type="section.buttonColor"
      class="w-2/3 py-8 text-lg !font-bold h-md:py-7"
      @click="selectSection(key)"
    >
      {{ section.text }}
    </n-button>

    <n-modal
      v-if="selectedSection !== ''"
      v-model:show="showModal"
      preset="card"
      class="w-[600px]"
      :title="sections[selectedSection].text"
      :bordered="false"
      size="huge"
    >
      // TODO
    </n-modal>

    <div class="shrink">
      <AppLink
        external
        path="/view/userspace/old/main/settings"
      >
        <n-button
          size="large"
          type="error"
          class="w-2/3 py-8 text-lg !font-bold h-md:py-7"
        >
          Вихід
        </n-button>
      </AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NModal } from "naive-ui"

import AppLink from "@/components/global/AppLink.vue"
import { ref } from "vue"

type Section = "levelMeter" | "cashDesk" | "adjustment"

const sections = {
  levelMeter: { text: "Рівномір", buttonColor: "info" },
  cashDesk: { text: "Каса", buttonColor: "success" },
  adjustment: { text: "Юстирування", buttonColor: "warning" },
} as const

const selectedSection = ref<Section | "">("")
const showModal = ref(false)

const selectSection = (section: Section) => {
  selectedSection.value = section
  showModal.value = true
}
</script>
