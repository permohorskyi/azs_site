import { Product } from "@/models/Product"
import type { Tank } from "@/models/Tank"
import { Pist, Trk } from "@/models/Trk"

import api from "@/services/providers/api"

interface Data {
  tanks: Array<Pick<Tank, "id_tank">>
  tovars: Array<Pick<Product, "id_tovar">>
  trks: Array<Pick<Trk, "id_trk"> & { [K in Extract<keyof Trk, "pists">]?: Array<Pick<Pist, "id_pist">> }>
}

/**
 * Щоб видалити об'єкту типу "tovar" | "tank" | "trk", нам потрібно відправити на api (/api/settings/delete) об'єкт з ідентифікатором без додаткових полів
 * Ми можемо видаляти декілька об'єктів різних типів. Якщо ми хочемо видалити тільки один об'єкт, ми відправляємо масив з одним об'єктом.
 * Якщо потрібно видалити вкладені елементи, вказуємо назву поля як ключ і масив з ідентифікатором вкладеного об'єкту без додаткових полів
 * @example
 * deleteAllSettings({ tanks: [{id_tank: 1}] })
 * @example
 * deleteAllSettings({ trks: [{id_trk: 1, pists: {id_pist: 1}}] })
 */
export const deleteAllSettings = async (data: Partial<Data>): Promise<void> => {
  await api.post("/db/userspace/admin/settings/delete", data)
}
