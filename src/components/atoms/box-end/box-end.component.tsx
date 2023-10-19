import { Box } from '@mui/material'
import { type ChildrenModel } from 'models'

export default function BoxEnd ({ children }: ChildrenModel) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
      {children}
    </Box>
  )
}
