import { type GridColDef } from '@mui/x-data-grid'
import { TableGrid } from 'components/organisms'
import { AppLayout } from 'components/templates'
import { type LoansModel, type AppStore, type UserCompleteModel } from 'models'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDudeDates, getFeeAmount, getUnitPrice } from 'utils'
import { addAbonoLoan } from '../../../redux/states/user'
import { updateUser } from '../../../redux/states/users'
import { Tooltip, Typography, Button } from '@mui/material'
import { DetailsLoansCard } from 'components/molecules'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'

interface Fees {
  id: number
  feeAmount: number
  date: Date
  dude_date: Date
  paid_fee: boolean
}

export default function LoansDetail () {
  const id: string = useParams<{ id: string }>().id ?? ''
  const user: UserCompleteModel = useSelector((store: AppStore) => store.user_active)
  const currentLoan: LoansModel = user.loans.find((loan) => loan.id.toString() === id) as LoansModel
  const dispatch = useDispatch()
  const nFees: number = currentLoan?.n_fees ?? 0
  const date: Date = new Date(currentLoan?.date ?? new Date())
  const feeAmount: number = getFeeAmount({
    initialAmount: currentLoan?.initialAmount ?? 0,
    interest: currentLoan?.interest ?? 0,
    nFees: currentLoan?.n_fees ?? 0
  })

  const fees: Fees[] = []

  const dudeDates: Date[] = getDudeDates({
    date,
    frequence: currentLoan?.frequence ?? '',
    nFees
  })

  for (let i = 1; i <= nFees; i++) {
    fees.push({
      id: i,
      feeAmount,
      date: currentLoan?.date ?? new Date(),
      dude_date: dudeDates[i - 1],
      paid_fee: !!(i <= currentLoan?.paid_fees ?? 0)
    })
  }
  const handleSubmit = (abono: number) => {
    dispatch(
      addAbonoLoan({
        ...currentLoan,
        abonos: currentLoan.abonos + abono,
        paid_fees: currentLoan.paid_fees + 1
      })
    )
    dispatch(
      updateUser({
        ...user,
        loans: user.loans.map((item) => {
          if (item.id === currentLoan.id) {
            return {
              ...item,
              abonos: item.abonos + abono,
              paid_fees: item.paid_fees + 1
            }
          }
          return item
        })
      })
    )
  }

  const loansDetailColums: GridColDef[] = [
    { field: 'id', headerName: 'No. cuota', width: 100, headerAlign: 'center', align: 'center' },
    {
      field: 'feeAmount',
      headerName: 'Valor cuota',
      width: 300,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => getUnitPrice(params.row.feeAmount)
    },
    {
      field: 'dude_date',
      headerName: 'Fecha de pago',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return new Date(params.row.dude_date).toLocaleDateString()
      }
    },
    {
      field: 'paid_fee',
      headerName: 'Estado',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
      <>
        {params.row.paid_fee
          ? (
            <Tooltip title="Cuota pagado" placement="bottom" arrow>
              <CheckCircleOutlinedIcon sx={{ color: 'green' }} />
            </Tooltip>
            )
          : (
            <Tooltip title="Cuota pendiente" placement="bottom" arrow>
              <WarningAmberOutlinedIcon sx={{ color: 'orange' }} />
            </Tooltip>
            )}
      </>
    },
    {
      field: 'actions',
      headerName: 'Pagar cuota',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        <Button sx={{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'primary.main'
          },
          '&:disabled': {
            opacity: 0.4
          }
        }}disabled={
          params.row.paid_fee
        }onClick={() => { handleSubmit(params.row.feeAmount) }}>
          <PaymentsOutlinedIcon sx={{ color: 'green' }} />
        </Button>
    }
  ]
  return (
    <AppLayout title='Detalles del préstamo'>
     <DetailsLoansCard loan={currentLoan} dudeDate={dudeDates} />
      <Typography variant="h6" component="h3" sx={{ my: 2 }} >Calendario de pagos</Typography>
      <TableGrid columns={loansDetailColums} rows={fees} />
    </AppLayout>
  )
}
