<template>
  <input
    type="color"
    :value="hash"
    class="formkit-input min-h-[1.5em] !w-14 min-w-0 grow cursor-pointer appearance-none text-clip rounded border-none bg-transparent p-0 text-base text-neutral-700 outline-none [color-scheme:light] selection:bg-blue-100 selection:text-neutral-700 placeholder:text-neutral-400 focus:ring-0 group-data-[prefix-icon]:mx-2 group-data-[suffix-icon]:mx-2 group-data-[disabled]:!cursor-not-allowed group-data-[has-overlay]:selection:!text-transparent dark:text-neutral-300 dark:[color-scheme:dark] dark:placeholder:text-neutral-400/50 [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none"
    @input="handleInput"
  >
</template>

<script setup lang="ts">
import { computed } from "vue"

import { getColorHash, getColorRGB } from "@/utils/color"

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  context: Object,
})

const hash = computed(() => getColorHash(props.context!._value))

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  props.context!.node.input(getColorRGB(target.value))
}
</script>
