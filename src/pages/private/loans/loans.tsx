import { AppLayout } from 'components/templates'
import { BoxEnd, Button, Modal, CustomPopover, Input } from 'components/atoms'
import { useModal } from 'hooks'
import { TableGrid } from 'components/organisms'
import {
  type AppStore,
  type AddLoanDebts,
  type DebtsModel,
  type LoansModel
} from 'models'
import { privateRoutes, regexs } from 'constant'
import { AddLoan } from 'components/molecules'
import React, { useState } from 'react'
import { Alert, Tooltip, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { type GridColDef } from '@mui/x-data-grid'
import { getUnitPrice } from 'utils'
import { addAbonoLoan, deleteLoan } from '../../../redux/states/user'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { updateUser } from '../../../redux/states/users'

export const debtsRows: DebtsModel[] = [
  {
    id: 1,
    fullName: 'Pedro Manuel Agames Rocha',
    document: '1002193429',
    email: 'lorem@gmail.com',
    city: 'Bogota',
    phone: 1623228
  },
  {
    id: 2,
    fullName: 'Jesus Camilo',
    document: '103193429',
    email: 'lorem@gmail.com',
    city: 'Cartagena',
    phone: 1623228
  }
]

export const debtsNamesAndDocuemnt: AddLoanDebts[] = debtsRows.map((item) => {
  return {
    fullName: item.fullName,
    document: item.document
  }
})
interface CalculateInterestModel {
  initialAmount: number
  interest: number
}
const calculateInterest = ({
  initialAmount,
  interest
}: CalculateInterestModel): number => {
  const interestAmount = (initialAmount * interest) / 100
  return interestAmount + initialAmount
}
export default function Loans () {
  const [alert, setAlert] = useState<boolean>(false)
  const userLoans = useSelector((store: AppStore) => store.user_active)
  const { open, setOpen, handleOpen } = useModal()
  const dispatch = useDispatch()
  const [abonos, setAbonos] = useState<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const abono = Number(e.target.value)
    setAbonos(abono)
  }
  const handleSubmit = (values: LoansModel) => {
    dispatch(addAbonoLoan({
      ...values,
      abonos: values.abonos + abonos
    }))
    dispatch(updateUser({
      ...userLoans,
      loans: userLoans.loans.map((item) => {
        if (item.id === values.id) {
          return {
            ...item,
            abonos: item.abonos + abonos
          }
        }
        return item
      })
    }))
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
      width: 120,
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
      width: 120,
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
      valueGetter: (params) => {
        const feeAmount = calculateInterest({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest
        })
        return getUnitPrice(feeAmount / params.row.n_fees)
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
          <Typography variant="body2" align="center"><strong>Código de deuda:</strong> {params.row.id}</Typography>
         <Input label='abonar' regex={regexs.NUMBERS} name='' onChange={handleChange} icon={<AttachMoneyOutlinedIcon />}/>
         <Button text="abonar" withIcon loading={false} onClick={() => { handleSubmit(params.row) }}/>
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
            <Tooltip title='Prestamo pagado' placement="bottom" arrow>
              <CheckCircleOutlinedIcon sx={{ color: 'green' }}/>
            </Tooltip>
            )
          : (
            <Tooltip title='Prestamo pendiente' placement="bottom" arrow>
              <WarningAmberOutlinedIcon sx={{ color: 'orange' }}/>
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
       <Tooltip title='Eliminar' placement="bottom" arrow>
          <DeleteOutlineOutlinedIcon sx={{ cursor: 'pointer', color: '#cb3234', mr: 1 }} onClick={() => {
            dispatch(deleteLoan(params.row.id))
            dispatch(updateUser({
              ...userLoans,
              loans: userLoans.loans.filter((item) => item.id !== params.row.id)
            }))
          }}/>
        </Tooltip>
          <Tooltip title="Ver detalles" placement="bottom" arrow>
            <RemoveRedEyeOutlinedIcon sx={{ cursor: 'pointer', fontWeight: 'lighter' }} onClick={() => {}}/>
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
