import { Typography } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import { getUnitPrice } from 'utils'
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

export const loansColumns: GridColDef[] = [
  { field: 'id', headerName: 'Código', width: 50 },
  {
    field: 'fullName',
    headerName: 'Nombre completo',
    width: 150,
    editable: true
  },
  {
    field: 'document',
    headerName: 'Documento',
    width: 150,
    editable: true
  },
  {
    field: 'date',
    headerName: 'Fecha',
    width: 100,
    editable: true
  },
  {
    field: 'initialAmount',
    headerName: 'Monto Neto',
    type: 'number',
    width: 150,
    renderCell: (params) => getUnitPrice(params.row.initialAmount)
  },
  {
    field: 'interest',
    headerName: 'Interes',
    type: 'number',
    width: 100,
    renderCell: (params) => `${params.row.interest}%`
  },
  {
    field: 'interestAmount',
    headerName: 'Monto total',
    type: 'number',
    width: 110,
    valueGetter: (params) =>
      getUnitPrice(
        calculateInterest({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest
        })
      )
  },
  {
    field: 'abonos',
    headerName: 'Abonos',
    type: 'number',
    width: 110,
    editable: true,
    renderCell: (params) => getUnitPrice(params.row.abonos)
  },
  {
    field: 'remainingAmount',
    headerName: 'Monto restante',
    type: 'number',
    width: 170,
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
    renderCell: (params) => (
      <>
        {calculateInterest({
          initialAmount: params.row.initialAmount,
          interest: params.row.interest
        }) -
          params.row.abonos <=
        0
          ? (
          <Typography variant="body2" color="green" align="center">
            Pago
          </Typography>
            )
          : (
          <Typography variant="body2" color="red" align="center">
            Pendiente
          </Typography>
            )}
      </>
    )
  }
  // {
  //   field: 'delete',
  //   headerName: 'Eliminar',
  //   width: 110,
  //   renderCell: (params) => (
  //     <>
  //       {params.row.initialAmount - params.row.abonos <= 0
  //         ? (
  //         <Typography
  //           variant="body2"
  //           color="text.secondary"
  //           align="center"
  //           sx={{ cursor: 'pointer' }}
  //         >
  //           Eliminar
  //         </Typography>
  //           )
  //         : (
  //         <Typography variant="body2" color="blue" align="center">
  //           En curso
  //         </Typography>
  //           )}
  //     </>
  //   )
  // }
]

export const debtsColumns: GridColDef[] = [
  { field: 'id', headerName: 'Código', width: 100 },
  {
    field: 'fullName',
    headerName: 'Nombre completo',
    width: 300
  },
  {
    field: 'document',
    headerName: 'Documento',
    width: 200
  },
  {
    field: 'email',
    headerName: 'Correo electrónico',
    width: 250
  },
  {
    field: 'phone',
    headerName: 'Teléfono',
    width: 150
  },
  {
    field: 'city',
    headerName: 'Ciudad',
    width: 150
  }
]
