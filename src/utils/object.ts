type Entries<T extends Record<string, any>> = Array<{ [K in NonNullable<keyof T>]: [K, T[K]] }[NonNullable<keyof T>]>

export const getObjectKeys = <T extends Record<string, any>>(object: T): Array<keyof T> => Object.keys(object) as Array<keyof T>

export const getObjectEntries = <T extends Record<string, any>>(object: T): Entries<T> => Object.entries(object) as Entries<T>

export const getObjectFromEntries = <T extends Record<string, any>>(entries: Entries<T>): T => Object.fromEntries(entries) as T
