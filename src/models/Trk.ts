export interface Pist {
  /** ідентифікатор пістолета */
  id_pist: number
  /** прив'язка до резервуара */
  id_tank: number
}

export interface Trk {
  /** ідентифікатор колонки */
  id_trk: number
  /** масив пістолетів */
  pists: Pist[]
}
