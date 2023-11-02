export interface DebtsModel {
  id: number
  fullName: string
  document: string
  email: string
  phone: number
  city: string
}
export interface AddLoanDebts {
  fullName: string
  document: string
}
export interface DebtsFieldsModel {
  label: string
  regex: RegExp
  date: Date
  icon: JSX.Element
  name: string
}
