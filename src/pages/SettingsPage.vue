<template>
  <main class="px-3">
    <n-grid
      x-gap="12"
      :cols="3"
      class="h-[100dvh]"
    >
      <n-grid-item class="h-full overflow-auto">
        <div class="flex h-full flex-col">
          <n-list
            hoverable
            clickable
            class="grow overflow-auto"
          >
            <template #header>
              <div class="text-lg font-bold">
                Види палива
              </div>
            </template>

            <n-list-item
              v-for="(product, ind) in products"
              :key="product.id_tovar"
              @click="showProduct(product)"
            >
              <n-thing :title="`${ind + 1}. ${product.name_p}`" />
            </n-list-item>
          </n-list>

          <n-modal
            v-if="selectedProduct"
            v-model:show="showSelectedProduct"
            preset="card"
            class="w-[600px] h-md:w-[800px]"
            :title="selectedProduct.name_p_f"
            :bordered="false"
            size="huge"
          >
            <ProductEditForm
              :product="selectedProduct"
              @update="saveSelectedProduct"
            />
          </n-modal>

          <LeftBottomPart />
        </div>
      </n-grid-item>

      <n-grid-item class="h-full overflow-auto">
        <n-list
          hoverable
          clickable
        >
          <template #header>
            <div class="text-lg font-bold">
              Резервуари
            </div>
          </template>

          <n-list-item
            v-for="tank in tanks"
            :key="tank.id_tank"
            @click="showTank(tank)"
          >
            <n-thing>
              <template #header>
                {{ tank.id_tank }}.
                <ProductTitle
                  :product="getProductByTank(tank)"
                  uncolored
                />
              </template>
            </n-thing>
          </n-list-item>
        </n-list>

        <n-modal
          v-if="selectedTank"
          v-model:show="showSelectedTank"
          preset="card"
          :title="`Резервуар ${selectedTank.id_tank}`"
          class="w-[600px]"
          :bordered="false"
          size="huge"
        >
          <TankEditForm
            :tank="selectedTank"
            @update="saveSelectedTank"
          />
        </n-modal>
      </n-grid-item>

      <n-grid-item class="h-full overflow-auto">
        <n-list
          hoverable
          clickable
        >
          <template #header>
            <div class="text-lg font-bold">
              Колонки
            </div>
          </template>

          <n-list-item
            v-for="trk in trks"
            :key="trk.id_trk"
            @click="toggleTrk(trk)"
          >
            <n-thing :title="`TRK ${trk.id_trk}`" />
          </n-list-item>
        </n-list>

        <n-modal
          v-if="selectedTrk"
          v-model:show="showSelectedTrk"
          preset="card"
          class="w-[600px]"
          :title="`TRK ${selectedTrk.id_trk}`"
          :bordered="false"
          size="huge"
        >
          <TrkEditForm
            :trk="selectedTrk"
            @update="updateTrk"
            @show-product="showProduct"
          />
        </n-modal>
      </n-grid-item>
    </n-grid>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

import { NList, NListItem, NThing, NGrid, NGridItem, NModal } from "naive-ui"

import type { Tank } from "@/models/Tank"
import type { Product } from "@/models/Product"
import type { Pist, Trk } from "@/models/Trk"

import ProductTitle from "@/components/common/ProductTitle.vue"
import ProductEditForm from "@/components/common/ProductEditForm.vue"
import TankEditForm from "@/components/common/TankEditForm.vue"
import TrkEditForm from "@/components/common/TrkEditForm.vue"

import { useSelectedInList } from "@/composables/global/selected-in-list"

import LeftBottomPart from "@/components/pages/settings/LeftBottomPart.vue"

import { setAllSettings } from "@/services/api/settings/set-all"

import { products, tanks, trks, getProductByTank, fetchSettingsData } from "@/store/settings"
import { deleteAllSettings } from "@/services/api/settings/delete-all"

const showSelectedProduct = ref(false)
const [selectedProduct, { set: setSelectedProductId }] = useSelectedInList(products, "id_tovar")
const showProduct = (product: Product) => {
  setSelectedProductId(product.id_tovar)
  showSelectedProduct.value = true
}
const saveSelectedProduct = async (product: Product) => {
  await setAllSettings({
    tovars: [product],
  })

  await fetchSettingsData()
}

const [selectedTrk, { toggle: toggleSelectedTrkId }] = useSelectedInList(trks, "id_trk")
const showSelectedTrk = ref(false)

const toggleTrk = (trk: Trk) => {
  toggleSelectedTrkId(trk.id_trk)
  showSelectedTrk.value = true
}

const updateTrk = async ({ trk, pists }: { trk: Trk; pists: Pist[] }) => {
  await setAllSettings({
    trks: [trk],
  })

  if (pists.length > 0) {
    await deleteAllSettings({
      trks: [
        {
          id_trk: trk.id_trk,
          pists: pists.map((p) => ({ id_pist: p.id_pist })),
        },
      ],
    })
  }

  await fetchSettingsData()
}

const showSelectedTank = ref(false)
const [selectedTank, { set: setSelectedTankId }] = useSelectedInList(tanks, "id_tank")
const showTank = (tank: Tank) => {
  setSelectedTankId(tank.id_tank)
  showSelectedTank.value = true
}
const saveSelectedTank = async (tank: Tank) => {
  await setAllSettings({
    tanks: [tank],
  })

  await fetchSettingsData()
}

onMounted(fetchSettingsData)
</script>
