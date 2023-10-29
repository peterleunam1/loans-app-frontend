interface CalculateInterestParams {
  initialAmount: number
  interest: number
}
interface CalculateFeeAmountParams extends CalculateInterestParams {
  nFees: number
}
export const calculateInterest = ({ initialAmount, interest }: CalculateInterestParams): number => {
  const interestAmount = (initialAmount * interest) / 100
  return Math.round(interestAmount + initialAmount)
}
export const getFeeAmount = ({ initialAmount, interest, nFees }: CalculateFeeAmountParams): number => {
  const interestAmount = calculateInterest({ initialAmount, interest })
  return Math.round(interestAmount / nFees)
}
