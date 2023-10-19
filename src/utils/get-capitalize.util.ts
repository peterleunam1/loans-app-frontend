export const getCapitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.toLocaleLowerCase().slice(1)
}
