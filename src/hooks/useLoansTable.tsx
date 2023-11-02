import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Typography } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid-premium'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { Button, CustomPopover, Input } from 'components/atoms'
import { privateRoutes, regexs } from 'constant'
import { calculateInterest, getFeeAmount, getUnitPrice } from 'utils'
import useNavigation from './useNavigation'
import { type LoansModel, type AppStore } from 'models'
import { addAbonoLoan, deleteLoan } from '../redux/states/user'
import { updateUser } from '../redux/states/users'

interface AddAbonoLoanParams {
  values: LoansModel
  abono: number
}

export default function useLoansTable () {
  const dispatch = useDispatch()

  const userLoans = useSelector((store: AppStore) => store.user_active)

  const [abonoInputValue, setAbonoInputValue] = useState<number>(0)

  const { goTo } = useNavigation()

  const handleRedirect = (id: number) => {
    goTo(`/${privateRoutes.PRIVATE}/${privateRoutes.LOANS_DETAIL.replace(':id', id.toString())}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbonoInputValue(Number(e.target.value))
  }

  const handleAddAbonoLoan = ({ values, abono }: AddAbonoLoanParams) => {
    const { id, abonos, paid_fees: paidFees } = values

    dispatch(
      addAbonoLoan({
        ...values,
        abonos: abonos + abono,
        paid_fees: paidFees + 1
      })
    )

    const newLoansToUpdateListUsers = userLoans.loans.map((item) => {
      if (item.id === id) {
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
        ...userLoans,
        loans: newLoansToUpdateListUsers
      })
    )
  }

  const handleDeleteLoan = (id: number) => {
    dispatch(deleteLoan(id))

    const newLoansToUpdateListUsers = userLoans.loans.filter(
      (item) => item.id !== id
    )

    dispatch(
      updateUser({
        ...userLoans,
        loans: newLoansToUpdateListUsers
      })
    )
  }

  const loansColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Código',
      width: 50
    },
    {
      field: 'fullName',
      headerName: 'Nombre',
      width: 100,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'document',
      headerName: 'Documento',
      width: 100,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'initialAmount',
      headerName: 'Monto Neto',
      type: 'number',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => getUnitPrice(params.row.initialAmount)
    },
    {
      field: 'interest',
      headerName: 'Interés',
      type: 'number',
      width: 65,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => `${params.row.interest}%`
    },
    {
      field: 'interestAmount',
      headerName: 'Monto total',
      type: 'number',
      width: 110,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        getUnitPrice(
          calculateInterest({
            initialAmount: params.row.initialAmount,
            interest: params.row.interest
          })
        )
    },
    {
      field: 'n_fess',
      headerName: 'N° Cuotas',
      type: 'number',
      width: 80,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => `${params.row.n_fees}`
    },
    {
      field: 'fee_amount',
      headerName: 'Cuota',
      type: 'number',
      width: 115,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => {
        const feeAmount = getFeeAmount({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest,
          nFees: params.row.n_fees
        })
        return getUnitPrice(feeAmount)
      }
    },
    {
      field: 'abonos',
      headerName: 'Abonos',
      type: 'number',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        const amountWithInterest = calculateInterest({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest
        })
        const feeAmount = getFeeAmount({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest,
          nFees: params.row.n_fees
        })
        return (
          <>
            {getUnitPrice(params.row.abonos)}
            <CustomPopover>
              {amountWithInterest - params.row.abonos <= 0
                ? <Typography variant="subtitle1" align="center">Préstamo pagado</Typography>
                : (
                <>
                  <Typography variant="subtitle1" align="center">
                    <strong>Código de deuda:</strong> {params.row.id}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    component="p"
                    sx={{ my: 1.5 }}
                  >
                    Pagar cuota de:
                    {getUnitPrice(feeAmount)}
                  </Typography>

                  <Button
                    text="pagar "
                    withIcon
                    loading={false}
                    onClick={() => {
                      handleAddAbonoLoan({
                        values: params.row,
                        abono: feeAmount
                      })
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    component="p"
                    sx={{ mb: 1.5, mt: 3 }}
                  >
                    ¿Desea ingresar otra cantidad?
                  </Typography>

                  <form action="">
                    <Input
                      label="abono"
                      icon={<></>}
                      name=""
                      onChange={handleChange}
                      regex={regexs.NUMBERS}
                      type="text"
                    />
                    <Button
                      text="abonar"
                      withIcon
                      loading={false}
                      onClick={() => {
                        handleAddAbonoLoan({
                          values: params.row,
                          abono: abonoInputValue
                        })
                      }}
                    />
                  </form>
                </>
                  )}
            </CustomPopover>
          </>
        )
      }
    },
    {
      field: 'remainingAmount',
      headerName: 'Monto restante',
      type: 'number',
      width: 140,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (params) =>
        getUnitPrice(
          calculateInterest({
            initialAmount: params.row.initialAmount,
            interest: params.row.interest
          }) - params.row.abonos
        )
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const amountWithInterest = calculateInterest({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest
        })
        return (
          <>
            {amountWithInterest - params.row.abonos <= 0
              ? (
              <Tooltip title="Prestamo pagado" placement="bottom" arrow>
                <CheckCircleOutlinedIcon sx={{ color: 'green' }} />
              </Tooltip>
                )
              : (
              <Tooltip title="Prestamo pendiente" placement="bottom" arrow>
                <WarningAmberOutlinedIcon sx={{ color: 'warning.main' }} />
              </Tooltip>
                )}
          </>
        )
      }
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <Tooltip title="Eliminar" placement="bottom" arrow>
            <DeleteOutlineOutlinedIcon
              sx={{ cursor: 'pointer', color: '#cb3234', mr: 1 }}
              onClick={() => {
                handleDeleteLoan(params.row.id)
              }}
            />
          </Tooltip>
          <Tooltip title="Ver detalles" placement="bottom" arrow>
            <RemoveRedEyeOutlinedIcon
              sx={{ cursor: 'pointer', fontWeight: 'lighter' }}
              onClick={() => {
                handleRedirect(params.row.id)
              }}
            />
          </Tooltip>
        </>
      )
    }
  ]
  return { loansColumns, userLoans }
}
