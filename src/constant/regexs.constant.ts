export const regexs = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  TEXT: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  NUMBERS: /^[0-9]*$/
}
