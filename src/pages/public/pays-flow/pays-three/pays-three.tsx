import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PaymentsLayout } from 'components/templates'
import { type LoansModel, type AppStore, type UserCompleteModel } from 'models'
import { creditFields, localStorageTypes, publicRoutes } from 'constant'
import { Button, Input } from 'components/atoms'
import credit from '../../../../assets/images/credit_card.svg'
import { Box, Typography, styled } from '@mui/material'
import { updateUser } from '../../../../redux/states/users'
import { getFeeAmount, getLocalStorage } from 'utils'
import { useNavigation } from 'hooks'
import { addAbonoLoan } from '../../../../redux/states/user'

export const Image = styled('img')(() => ({
  width: '25%'
}))

export default function PaysThree () {
  const id: string = useParams<{ id: string }>().id ?? ''
  const { goTo } = useNavigation()
  const dispatch = useDispatch()
  const currentClientDocument = useSelector((store: AppStore) => store.owner.document)
  const usersP = useSelector((store: AppStore) => store.users)
  const user = usersP.find((user) => user.document === currentClientDocument) as UserCompleteModel
  const loan = user.loans.find(loan => loan.id === Number(id)) as LoansModel
  console.log(loan)

  const handlePay = () => {
    const feeAmount = getFeeAmount({
      initialAmount: loan.initialAmount,
      interest: loan.interest,
      nFees: loan.n_fees
    })
    console.log(feeAmount)
    alert('Pago realizado con éxito')
    dispatch(updateUser({
      ...user,
      loans: user.loans.map(loan => {
        if (loan.id === Number(id)) {
          return {
            ...loan,
            paid_fees: loan.paid_fees + 1,
            abonos: loan.abonos + feeAmount
          }
        }
        return loan
      })
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
        <Typography variant="h6" component="h1" sx={{ mb: 2 }}>Agregar tarjeta</Typography>
       <Box sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         gap: 10,
         height: '60vh'
       }}
       >
       <Image src={credit} alt="credit_card" />
        <form style={{ width: '65%' }}>
        {creditFields.map((fields, index) => <Input {...fields} key={index} onChange={() => {}} />)}
        <Box sx={{ mt: 5 }}><Button loading={false} text='Pagar' onClick={handlePay} withIcon /></Box>
        </form>
       </Box>
       <Typography onClick={() => { goTo(`/${publicRoutes.PAY_TWO}`) }}>Regresar</Typography>
    </PaymentsLayout>
  )
}
