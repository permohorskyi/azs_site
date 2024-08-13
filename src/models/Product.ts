export interface Product {
  /** ідентифікатор вида палива */
  id_tovar: number
  /** ім'я */
  name: string
  /** коротке ім'я для каси */
  name_p: string
  /** довге ім'я для каси */
  name_p_f: string
  color: {
    r: number
    g: number
    b: number
  }
  /** одиниця вимірювання */
  name_p_v: string
  /** ціна */
  price: number
}
