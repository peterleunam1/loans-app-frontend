import {
  DataGrid, type GridColDef
} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { type FeesModel, type DebtsModel, type LoansModel } from 'models'

interface TableProps {
  rows: LoansModel[] | DebtsModel[] | FeesModel[]
  columns: GridColDef[]
}

export default function TableGrid ({ rows, columns }: TableProps) {
  return (
    <Box sx={{ height: '77vh', maxWidth: '100&' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8
            }
          }
        }}
        pageSizeOptions={[8]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}
