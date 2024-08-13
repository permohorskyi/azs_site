export const getType = (value: unknown): string => Object.prototype.toString.call(value).slice(8, -1).toLowerCase()

export const isString = (value: unknown): value is string => getType(value) === "string"

export const isNumber = (value: unknown): value is number => getType(value) === "number" && !Number.isNaN(value)

export const isBoolean = (value: unknown): value is boolean => getType(value) === "boolean"

export const isSymbol = (value: unknown): value is symbol => getType(value) === "symbol"

export const isDate = (value: unknown): value is Date => getType(value) === "date"

export const isNull = (value: unknown): value is null => value === null

export const isObject = <T extends Record<string, any>>(value: unknown): value is T => getType(value) === "object" && !isNull(value)

export const isArray = <T>(value: unknown): value is T[] => getType(value) === "array"

export const isFunction = <T extends (...r: unknown[]) => unknown>(value: unknown): value is T => getType(value) === "function"

export const isUndefined = (value: unknown): value is undefined => value === undefined

export const isNullable = (value: unknown): value is null | undefined => isNull(value) || isUndefined(value)
