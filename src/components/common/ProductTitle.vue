<template>
  <span :style="{ color }">
    {{ product.name_p }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"

import type { Product } from "@/models/Product"

import { getColorHash } from "@/utils/color"

const props = defineProps<{
  product: Product
  uncolored?: boolean
}>()

const color = computed(() => (props.uncolored ? "black" : getColorHash(props.product.color)))
</script>
