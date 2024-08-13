<template>
  <FormKit
    v-model="copiedProduct"
    type="form"
    :actions="false"
    @submit="(p) => $emit('update', p)"
  >
    <div class="h-md:hidden">
      <FormKitSchema :schema="productSchema" />
    </div>
    <div class="hidden h-md:grid h-md:grid-cols-2 h-md:gap-8">
      <FormKitSchema :schema="productSchema.slice(0, 3)" />
      <FormKitSchema :schema="productSchema.slice(3)" />
    </div>
  </FormKit>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import cloneDeep from "clone-deep"

import { FormKitSchema } from "@formkit/vue"
import type { FormKitSchemaNode } from "@formkit/core"

import type { Product } from "@/models/Product"

const props = defineProps<{
  product: Product
}>()
defineEmits<{
  update: [product: Product]
}>()

const copiedProduct = reactive(cloneDeep(props.product))

const productSchema: FormKitSchemaNode[] = [
  {
    $formkit: "text",
    name: "name",
    label: "Ім'я",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "name_p",
    label: "Коротке ім'я для каси",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "name_p_f",
    label: "Довге ім'я для каси",
    validation: "required",
  },
  {
    $cmp: "FormKit",
    props: {
      type: "rgb",
      label: "Колір",
      name: "color",
    },
  },
  {
    $formkit: "text",
    name: "name_p_v",
    label: "Одиниця вимірювання",
    validation: "required",
  },
  {
    $formkit: "number",
    number: "float",
    step: 0.01,
    name: "price",
    label: "Ціна",
    validation: "required",
  },
  {
    $formkit: "submit",
    label: "Зберегти",
  },
]
</script>
