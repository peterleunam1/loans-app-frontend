export const persistLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key)
  if (item !== null) {
    return JSON.parse(item)
  }
  return undefined
}
