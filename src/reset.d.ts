import "@total-typescript/ts-reset"

declare global {
  interface ObjectConstructor {
    keys<T extends Record<string, any>>(obj: T): Array<keyof T>
    entries<T extends Record<string, any>>(obj: T): Array<{ [K in keyof T]: [K, T[K]] }[keyof T]>
  }
}
