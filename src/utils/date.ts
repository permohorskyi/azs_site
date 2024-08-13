import { format as fnsFormat, parse as fnsParse, parseISO, isValid } from "date-fns"
import { uk } from "date-fns/locale"

import { isDate, isNumber, isString, isUndefined } from "./check-runtime-types"

const DATE = "dd.MM.yyyy"
const DATE_SHORT = "dd.MM"
const TIME = "HH:mm"
const DATE_TIME = `${DATE} ${TIME}` as const
const DATE_TIME_SHORT = `${DATE_SHORT} ${TIME}` as const

export const FORMAT = {
  DATE,
  DATE_SHORT,
  TIME,
  DATE_TIME,
  DATE_TIME_SHORT,
} as const

type MaybeDate = number | string | Date

export const parseDate = (date: MaybeDate, format?: string): Date => {
  if (isDate(date)) return date
  if (isNumber(date)) return new Date(date)
  if (isString(format)) return fnsParse(date, format, 0)
  return parseISO(date)
}

export const formatDate = (date: MaybeDate, format = DATE): string => fnsFormat(parseDate(date), format, { locale: uk })

export const parseTime = (time: string, date?: MaybeDate): Date => {
  const dateFormatted = isUndefined(date) ? "01.01.1970" : formatDate(parseDate(date), DATE)
  return parseDate(`${dateFormatted} ${time}`, FORMAT.DATE_TIME)
}

export const isDateValid = (date: MaybeDate): boolean => isValid(parseDate(date))
export const isTimeValid = (time: string): boolean => isValid(parseTime(time))
