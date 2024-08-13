import { Product } from "@/models/Product"
import type { Tank } from "@/models/Tank"
import { Trk } from "@/models/Trk"

import api from "@/services/providers/api"

interface Data {
  tanks: Tank[]
  tovars: Product[]
  trks: Trk[]
}

/**
 * Щоб присвоїти нове значення об'єкту типу "tovar" | "tank" | "trk", нам потрібно відправити на api (/api/settings/set) змінений об'єкт відповідного типу
 * Ми можемо встановлювати нові значення для декількох об'єктів різних типів. Якщо ми хочемо змінити тільки один об'єкт, ми відправляємо масив з одним об'єктом.
 * Не потрібно відправляти всі об'єкти, відправляємо лише ті, які потрібно змінити.
 * Ми можемо присвоювати значення різним типам об'єктів в одному запиті
 */
export const setAllSettings = async (data: Partial<Data>): Promise<void> => {
  await api.post("/db/userspace/admin/settings/set", data)
}
