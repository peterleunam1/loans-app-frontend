import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { PaymentsLayout } from 'components/templates'
import { type LoansModel, type AppStore, type UserCompleteModel } from 'models'
import { localStorageTypes, publicRoutes } from 'constant'
import { updateUser } from '../../../../redux/states/users'
import { getFeeAmount, getLocalStorage } from 'utils'
import { useNavigation } from 'hooks'
import { addAbonoLoan } from '../../../../redux/states/user'
import { PayCard } from 'components/molecules'

export default function PaysThree () {
  const id: string = useParams<{ id: string }>().id ?? ''
  const { goTo } = useNavigation()
  const dispatch = useDispatch()
  const currentClientDocument = useSelector((store: AppStore) => store.owner.document)
  const globalUsers = useSelector((store: AppStore) => store.users)
  const user = globalUsers.find((user) => user.document === currentClientDocument) as UserCompleteModel
  const loan = user.loans.find(loan => loan.id === Number(id)) as LoansModel
  const feeAmount = getFeeAmount({
    initialAmount: loan.initialAmount,
    interest: loan.interest,
    nFees: loan.n_fees
  })
  const handlePay = () => {
    // Write your code here!!! (don't forget to remove this comment)
    // feeAmount is the amount of the fee to pay (you can use this value to pay the fee)

    // This is an example of how to update the user in the redux store, PLEASE DON'T REMOVE THIS CODE
    const newLoansToUpdateListUsers = user.loans.map(loan => {
      if (loan.id === Number(id)) {
        return {
          ...loan,
          paid_fees: loan.paid_fees + 1,
          abonos: loan.abonos + feeAmount
        }
      }
      return loan
    })

    dispatch(updateUser({
      ...user,
      loans: newLoansToUpdateListUsers
    }))

    getLocalStorage(localStorageTypes.USER) !== undefined && (
      dispatch(addAbonoLoan({
        ...loan,
        paid_fees: loan.paid_fees + 1,
        abonos: loan.abonos + feeAmount
      }))
    )
  }
  return (
    <PaymentsLayout activeStep={2}>
      <PayCard handlePay={handlePay} onChange={() => {}} />
       <Typography onClick={() => { goTo(`/${publicRoutes.PAY_TWO}`) }}>Regresar</Typography>
    </PaymentsLayout>
  )
}
