import type { Tank } from "@/models/Tank"

import api from "@/services/providers/api"

export const getTanks = async (): Promise<Tank[]> => {
  const data = await api.get<{ tanks: Tank[] }>("/settings/tanks/get")
  return data.tanks
}
