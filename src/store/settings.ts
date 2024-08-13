import { ref } from "vue"

import type { Tank } from "@/models/Tank"
import type { Product } from "@/models/Product"
import type { Pist, Trk } from "@/models/Trk"

import { getAllSettings } from "@/services/api/settings/get-all"

export const tanks = ref<Tank[]>([])
export const products = ref<Product[]>([])
export const trks = ref<Trk[]>([])

export const getProductByTank = (tank: Tank): Product => {
  return products.value.find((p) => p.id_tovar === tank?.id_tovar)!
}
export const getTankByPist = (pist: Pist): Tank => {
  return tanks.value.find((t) => t.id_tank === pist.id_tank)!
}
export const getProductByPist = (pist: Pist): Product => {
  const tank = getTankByPist(pist)
  return getProductByTank(tank)
}

export const fetchSettingsData = async () => {
  const data = await getAllSettings()

  tanks.value = data.tanks
  products.value = data.tovars
  trks.value = data.trks
}
