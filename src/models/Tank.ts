export interface Tank {
  /** ідентифікатор резервуара */
  id_tank: number
  /** прив'язка до видів палива */
  id_tovar: number
  /** залишок в резервуарі */
  volume: number
  /** мертвий залишок в резервуарі */
  remain: number
}
