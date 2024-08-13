import { isObject } from "@/utils/check-runtime-types"
import { computed, type ComputedRef, ref, type Ref } from "vue"

export const useSelectedInList = <T extends Record<string, any> | string | number>(
  list: Ref<T[]>,
  key: T extends Record<string, any> ? keyof T : T,
): [
  ComputedRef<T | null>,
  {
    set: (val: string | number) => void
    toggle: (val: string | number) => void
    clear: () => void
  },
] => {
  const keyValue = ref<null | string | number>(null)

  const selectedItem = computed<T | null>(() => {
    const foundItem = list.value.find((item) => {
      if (isObject(item)) {
        // @ts-expect-error -- hard to compute
        return item[key] === keyValue.value
      } else {
        return item === keyValue.value
      }
    })

    return foundItem ?? null
  })

  const set = (selectedValue: string | number) => {
    keyValue.value = selectedValue
  }
  const clear = () => {
    keyValue.value = null
  }

  const toggle = (selectedValue: string | number) => {
    if (keyValue.value === null) set(selectedValue)
    else if (keyValue.value !== selectedValue) set(selectedValue)
    else keyValue.value = null
  }

  return [selectedItem, { set, toggle, clear }]
}
