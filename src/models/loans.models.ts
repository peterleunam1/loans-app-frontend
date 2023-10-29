export interface LoansModel {
  id: number
  fullName: string
  document: string
  initialAmount: number
  abonos: number
  date: Date
  interest: number
  reason: string
  n_fees: number
  paid_fees: number
  frequence: string
}
