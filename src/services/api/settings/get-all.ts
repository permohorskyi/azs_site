import { Product } from "@/models/Product"
import type { Tank } from "@/models/Tank"
import { Trk } from "@/models/Trk"

import api from "@/services/providers/api"

interface Data {
  tanks: Tank[]
  tovars: Product[]
  trks: Trk[]
}

export const getAllSettings = async (): Promise<Data> => {
  const data = await api.get<Data>("/db/userspace/admin/settings/get")
  return data
}
