import Box from '@mui/material/Box'
import {
  DataGrid
} from '@mui/x-data-grid'
import { type DebtsModel, type LoansModel } from 'models'
import {
  type GridColDef
} from '@mui/x-data-grid'

interface TableProps {
  rows: LoansModel[] | DebtsModel[]
  columns: GridColDef[]
}

export default function TableGrid ({ rows, columns }: TableProps) {
  return (
    <Box sx={{ height: '75vh', maxWidth: '100&' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7
            }
          }
        }}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold'
          },
          // hacer que la tabla tenga un scroll horizontal y no cambie el tamaño de las columnas y ventana
          '& .MuiDataGrid-root': {
            minWidth: '100%',
            overflowX: 'scroll'
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
