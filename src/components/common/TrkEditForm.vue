<template>
  <n-thing>
    <div
      v-for="(pist, ind) in copiedTrk.pists"
      :key="pist.id_pist"
      class="mb-2 flex items-center gap-3 last:mb-0"
    >
      Пістолет {{ ind + 1 }} (id: {{ pist.id_pist }}):
      <span class="ml-3">Резервуар</span>
      <n-select
        v-model:value="pist.id_tank"
        :options="tankOptions"
        class="w-20"
      />
      ->
      <ProductTitle
        class="cursor-pointer font-bold"
        :product="getProductByPist(pist)"
        @click.stop="$emit('show-product', getProductByPist(pist))"
      />
      <n-button
        type="warning"
        class="ml-auto"
        @click="deletePist(pist)"
      >
        Видалити
      </n-button>
    </div>

    <div class="flex items-center gap-3">
      Новий пістолет:
      <span class="ml-3">Резервуар</span>
      <n-select
        v-model:value="newPist.id_tank"
        :options="tankOptions"
        class="w-20"
      />
      <template v-if="newPist.id_tank">
        ->
        <ProductTitle
          class="cursor-pointer font-bold"
          :product="getProductByPist(newPist)"
          @click.stop="$emit('show-product', getProductByPist(newPist))"
        />
      </template>
      <n-button
        type="success"
        class="ml-auto"
        :disabled="!newPist.id_tank"
        @click="addPist"
      >
        Додати
      </n-button>
    </div>

    <n-button
      type="info"
      size="large"
      class="mt-5"
      @click="updateTrk"
    >
      Зберегти
    </n-button>
  </n-thing>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import cloneDeep from "clone-deep"

import { NThing, NSelect, NButton, type SelectOption } from "naive-ui"

import type { Product } from "@/models/Product"
import type { Pist, Trk } from "@/models/Trk"

import ProductTitle from "@/components/common/ProductTitle.vue"

import { useReactive } from "@/composables/global/reactive"

import { getProductByPist, tanks } from "@/store/settings"

const props = defineProps<{
  trk: Trk
}>()

const emit = defineEmits<{
  update: [{ trk: Trk; pists: Pist[] }]
  "show-product": [product: Product]
}>()

const [copiedTrk] = useReactive(props.trk, { watch: () => props.trk })

const emptyPist: Pist = {
  id_pist: 0,
  id_tank: 0,
}

const newPist = ref<Pist>(cloneDeep(emptyPist))

const addPist = () => {
  copiedTrk.pists.push(newPist.value)
  newPist.value = cloneDeep(emptyPist)
}

const deletedPists: Pist[] = []

const deletePist = (pist: Pist) => {
  copiedTrk.pists = copiedTrk.pists.filter((p) => p !== pist)
  deletedPists.push(pist)
}

const updateTrk = () => {
  emit("update", {
    trk: copiedTrk,
    pists: deletedPists,
  })
}

const tankOptions = computed<SelectOption[]>(() =>
  tanks.value.map<SelectOption>((tank) => ({
    label: tank.id_tank.toString(),
    value: tank.id_tank,
  })),
)
</script>
