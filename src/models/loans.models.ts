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

export interface LoansInputsReturned {
  deudor: string
  interest: string
  initialAmount: string
  n_fees: number
  frequence: string
  reason: string
}

export interface FeesModel {
  id: number
  feeAmount: number
  date: Date
  dude_date: Date
  paid_fee: boolean
}
