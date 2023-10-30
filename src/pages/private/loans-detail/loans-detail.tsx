import { TableGrid } from 'components/organisms'
import { AppLayout } from 'components/templates'
import { type AppStore, type UserCompleteModel } from 'models'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllPayments, getDudeDates, getFeeAmount } from 'utils'
import { Typography } from '@mui/material'
import { DetailsLoansCard } from 'components/molecules'
import { useDetailLoan } from 'hooks'

export default function LoansDetail () {
  const id: string = useParams<{ id: string }>().id ?? ''

  const user: UserCompleteModel = useSelector(
    (store: AppStore) => store.user_active
  )

  const { loansDetailColums, currentLoan } = useDetailLoan({
    user,
    idCurrentLoan: id
  })

  const {
    n_fees: nFees, date, interest, initialAmount, frequence
  } = currentLoan

  const dateInit: Date = new Date(date)

  const feeAmount: number = getFeeAmount({ initialAmount, interest, nFees })

  const dudeDates: Date[] = getDudeDates({ date: dateInit, frequence, nFees })

  const fees = getAllPayments({ dudeDates, feeAmount, nFees, currentLoan })

  return (
    <AppLayout title="Detalles del préstamo">
      <DetailsLoansCard loan={currentLoan} dudeDate={dudeDates} />
      <Typography variant="h6" component="h3" sx={{ my: 2 }}>
        Calendario de pagos
      </Typography>
      <TableGrid columns={loansDetailColums} rows={fees} />
    </AppLayout>
  )
}
