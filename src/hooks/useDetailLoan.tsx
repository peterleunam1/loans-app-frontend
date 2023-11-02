import { Button, Tooltip } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid-premium'
import { getUnitPrice } from 'utils'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import { useDispatch } from 'react-redux'
import { addAbonoLoan } from '../redux/states/user'
import { updateUser } from '../redux/states/users'
import { type LoansModel, type UserCompleteModel } from 'models'

interface UseDetailLoanProps {
  user: UserCompleteModel
  idCurrentLoan: string
}

export default function useDetailLoan ({ user, idCurrentLoan }: UseDetailLoanProps) {
  const dispatch = useDispatch()

  const currentLoan: LoansModel = user.loans.find(
    (loan) => loan.id.toString() === idCurrentLoan
  ) as LoansModel

  const handleSubmit = (abono: number) => {
    dispatch(
      addAbonoLoan({
        ...currentLoan,
        abonos: currentLoan.abonos + abono,
        paid_fees: currentLoan.paid_fees + 1
      })
    )

    const newLoansToUpdateListUsers = user.loans.map((item) => {
      if (item.id === currentLoan.id) {
        return {
          ...item,
          abonos: item.abonos + abono,
          paid_fees: item.paid_fees + 1
        }
      }
      return item
    })

    dispatch(
      updateUser({
        ...user,
        loans: newLoansToUpdateListUsers
      })
    )
  }

  const loansDetailColums: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No. cuota',
      width: 100,
      headerAlign: 'center',
      align: 'center'
    },
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
      renderCell: (params) => (
        <>
          {params.row.paid_fee
            ? (
            <Tooltip title="Cuota pagado" placement="bottom" arrow>
              <CheckCircleOutlinedIcon sx={{ color: 'success.main' }} />
            </Tooltip>
              )
            : (
            <Tooltip title="Cuota pendiente" placement="bottom" arrow>
              <WarningAmberOutlinedIcon sx={{ color: 'warning.main' }} />
            </Tooltip>
              )}
        </>
      )
    },
    {
      field: 'actions',
      headerName: 'Pagar cuota',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'primary.main'
            },
            '&:disabled': {
              opacity: 0.4
            }
          }}
          disabled={params.row.paid_fee}
          onClick={() => {
            handleSubmit(params.row.feeAmount)
          }}
        >
          <PaymentsOutlinedIcon sx={{ color: 'success.main' }} />
        </Button>
      )
    }
  ]
  return { loansDetailColums, currentLoan }
}
