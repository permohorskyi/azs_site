import { reactive, readonly, type DeepReadonly, watch } from "vue"
import cloneDeep from "clone-deep"

import { isArray, isObject } from "@/utils/check-runtime-types"
import { getObjectKeys } from "@/utils/object"

export type DeepWritable<T> = {
  -readonly [P in keyof T]: DeepWritable<T[P]>
}

type UseReactiveReturns<T extends Record<string, any>, R extends boolean = false> = [
  R extends true ? DeepReadonly<T> : T,
  <K extends keyof T>(field: K, value: T[K]) => void,
  {
    clearField: (field: keyof T) => void
    setFields: (obj: Partial<T>) => void
    clearFields: (fields?: Partial<T> | Array<keyof T>) => void
  },
]

type Options<T extends Record<string, any>, R extends boolean = false> = {
  watch: () => T
  readonly: R
}

export function useReactive<T extends Record<string, any>, R extends boolean = false>(
  obj: T,
  options: Partial<Options<T, R>> = {},
): UseReactiveReturns<T, R> {
  const initialValue = cloneDeep(obj)
  const customReactive = reactive<T>(obj)

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]): void => {
    // @ts-expect-error -- should be set
    customReactive[field] = value
  }

  const clearField = (field: keyof T): void => {
    // @ts-expect-error -- should be cleared
    customReactive[field] = initialValue[field]
  }

  const setFields = (newObj: Partial<T>): void => {
    Object.entries(newObj).forEach(([field, value]) => {
      // @ts-expect-error -- should be set
      setFieldValue(field, value)
    })
  }

  const clearFields = (fields?: Partial<T> | Array<keyof T>): void => {
    if (isArray<keyof T>(fields)) fields.forEach(clearField)
    else if (isObject(fields)) Object.keys(fields).forEach(clearField)
    else Object.keys(initialValue).forEach(clearField)
  }

  if (options.watch) {
    watch(options.watch, (newObj) => {
      const keys = getObjectKeys(customReactive as T)
      clearFields(keys)
      setFields(newObj)
    })
  }

  return [
    // @ts-expect-error -- hard to computed
    options.readonly ? readonly(customReactive) : customReactive,
    setFieldValue,
    {
      clearField,
      setFields,
      clearFields,
    },
  ]
}
