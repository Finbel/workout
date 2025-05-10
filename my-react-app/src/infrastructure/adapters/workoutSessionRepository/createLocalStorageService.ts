type Store<T> = {
  [key: string]: T
}

export const createLocalStorageService = <T extends { id: string }>(
  key: string,
  storeParser: (value: string) => Store<T>,
) => {
  return {
    init: () => {
      const value = localStorage.getItem(key)
      if (!value) {
        const init: Store<T> = {}
        localStorage.setItem(key, JSON.stringify(init))
      }
    },
    getById: (id: string): T | null => {
      const value = localStorage.getItem(key)
      if (!value) {
        throw new Error('Store not initialized')
      }
      const parsedValue = storeParser(value)
      return parsedValue[id] ?? null
    },
    update: (valueToUpdate: T) => {
      const value = localStorage.getItem(key)
      if (!value) {
        throw new Error('Store not initialized')
      }
      const parsedValue = storeParser(value)
      parsedValue[valueToUpdate.id] = valueToUpdate
      localStorage.setItem(key, JSON.stringify(parsedValue))
    },
    remove: (id: string) => {
      const value = localStorage.getItem(key)
      if (!value) {
        throw new Error('Store not initialized')
      }
      const parsedValue = storeParser(value)
      delete parsedValue[id]
      localStorage.setItem(key, JSON.stringify(parsedValue))
    },
  }
}
