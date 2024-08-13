import { isString } from "@/utils/check-runtime-types"

export const isEmptyString = (str: unknown): str is "" => isString(str) && str === ""

export const isNotEmptyString = (str: unknown): str is string => isString(str) && str !== ""
