import { AppLayout } from 'components/templates'
import { BoxEnd, Button, Modal, CustomPopover, Input } from 'components/atoms'
import { useModal, useNavigation } from 'hooks'
import { TableGrid } from 'components/organisms'
import { type AppStore, type LoansModel } from 'models'
import { privateRoutes, regexs } from 'constant'
import { AddLoan } from 'components/molecules'
import { useState } from 'react'
import { Alert, Tooltip, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { type GridColDef } from '@mui/x-data-grid'
import { calculateInterest, getFeeAmount, getUnitPrice } from 'utils'
import { addAbonoLoan, deleteLoan } from '../../../redux/states/user'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { updateUser } from '../../../redux/states/users'

export default function Loans () {
  const [alert, setAlert] = useState<boolean>(false)
  const [abonoInputValue, setAbonoInputValue] = useState<number>(0)
  const userLoans = useSelector((store: AppStore) => store.user_active)
  const { open, setOpen, handleOpen } = useModal()
  const { goTo } = useNavigation()
  const dispatch = useDispatch()
  const handleRedirect = (id: number) => {
    goTo(`/${privateRoutes.PRIVATE}/${privateRoutes.LOANS_DETAIL.replace(':id', id.toString())}`)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbonoInputValue(Number(e.target.value))
  }
  const handleSubmit = (values: LoansModel, abono: number) => {
    dispatch(
      addAbonoLoan({
        ...values,
        abonos: values.abonos + abono,
        paid_fees: values.paid_fees + 1
      })
    )
    dispatch(
      updateUser({
        ...userLoans,
        loans: userLoans.loans.map((item) => {
          if (item.id === values.id) {
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

  const loansColumns: GridColDef[] = [
    { field: 'id', headerName: 'Código', width: 50 },
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
      renderCell: (params) => (
        <>
          {getUnitPrice(params.row.abonos)}
          <CustomPopover>
            {
               calculateInterest({
                 initialAmount: params.row.initialAmount,
                 interest: params.row.interest
               }) - params.row.abonos <= 0
                 ? (
                <Typography variant="subtitle1" align="center">
                  Préstamo pagado
                </Typography>
                   )
                 : (
                <>
                  <Typography variant="subtitle1" align="center">
              <strong>Código de deuda:</strong> {params.row.id}
            </Typography>
            <Typography variant='subtitle2' component='p' sx={{ my: 1.5 }}>
            Pagar cuota de: {getUnitPrice(getFeeAmount({
              initialAmount: params.row.initialAmount,
              interest: params.row.interest,
              nFees: params.row.n_fees
            }))}
            </Typography>
            <Button
              text="pagar "
              withIcon
              loading={false}
              onClick={() => {
                handleSubmit(params.row, getFeeAmount({
                  initialAmount: params.row.initialAmount,
                  interest: params.row.interest,
                  nFees: params.row.n_fees
                }))
              }}
            />
            <Typography variant='subtitle2' component='p' sx={{ mb: 1.5, mt: 3 }}>¿Desea ingresar otra cantidad?</Typography>
            <form action="">
              <Input label="abono" icon={<></>} name='' onChange={handleChange} regex={regexs.NUMBERS} type='text' />
              <Button text="abonar" withIcon loading={false} onClick={() => { handleSubmit(params.row, abonoInputValue) }} />
            </form>
                </>
                   )
            }
          </CustomPopover>
        </>
      )
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
      renderCell: (params) => (
        <>
          {calculateInterest({
            initialAmount: params.row.initialAmount,
            interest: params.row.interest
          }) -
            params.row.abonos <=
          0
            ? (
            <Tooltip title="Prestamo pagado" placement="bottom" arrow>
              <CheckCircleOutlinedIcon sx={{ color: 'green' }} />
            </Tooltip>
              )
            : (
            <Tooltip title="Prestamo pendiente" placement="bottom" arrow>
              <WarningAmberOutlinedIcon sx={{ color: 'orange' }} />
            </Tooltip>
              )}
        </>
      )
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
                dispatch(deleteLoan(params.row.id))
                dispatch(
                  updateUser({
                    ...userLoans,
                    loans: userLoans.loans.filter(
                      (item) => item.id !== params.row.id
                    )
                  })
                )
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

  return (
    <AppLayout title={privateRoutes.LOANS}>
      {alert && (
        <Alert severity="success" sx={{ mb: 1 }}>
          Prestamo creado con éxito
        </Alert>
      )}
      <BoxEnd>
        <Button
          text="crear prestamo"
          withIcon
          loading={false}
          onClick={handleOpen}
        />
      </BoxEnd>
      <TableGrid columns={loansColumns} rows={userLoans.loans} />
      <Modal open={open} setOpen={setOpen} title="crear préstamo">
        <AddLoan setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </AppLayout>
  )
}
