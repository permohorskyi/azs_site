import { isArray, isNumber, isObject, isString } from "@/utils/check-runtime-types"
import { isDateValid, parseDate } from "@/utils/date"
import { formatFloat } from "@/utils/number"

export const parseJSON = <T>(parsingValue: T): T => {
  if (!isObject(parsingValue) && !isArray(parsingValue)) {
    if (isString(parsingValue) && isDateValid(parseDate(parsingValue))) {
      return parseDate(parsingValue) as T
    }

    if (isNumber(parsingValue)) {
      return formatFloat(parsingValue) as T
    }

    return parsingValue
  }

  if (isArray<T>(parsingValue)) return parsingValue.map((i) => parseJSON(i)) as T

  const entries = Object.entries(parsingValue).map(([key, value]) => {
    let parsedValue = value as Date | T

    if (isArray<T>(value)) {
      parsedValue = value.map((i) => parseJSON(i)) as T
    } else if (isObject(value)) {
      parsedValue = parseJSON(value) as T
    } else if (isString(value) && isDateValid(parseDate(value))) {
      parsedValue = parseDate(value)
    } else if (isNumber(value)) {
      parsedValue = formatFloat(value) as T
    }

    return [key, parsedValue]
  })

  return Object.fromEntries(entries)
}
