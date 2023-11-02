import { type FeesModel, type LoansModel } from 'models'

interface GetAllPaymentsParams {
  nFees: number
  feeAmount: number
  currentLoan: LoansModel
  dudeDates: Date[]
}

export const getAllPayments = ({ currentLoan, dudeDates, nFees, feeAmount }: GetAllPaymentsParams): FeesModel[] => {
  const fees: FeesModel[] = []

  for (let i = 1; i <= nFees; i++) {
    fees.push({
      id: i,
      feeAmount,
      date: currentLoan?.date ?? new Date(),
      dude_date: dudeDates[i - 1],
      paid_fee: !!(i <= currentLoan?.paid_fees ?? 0)
    })
  }

  return fees
}
