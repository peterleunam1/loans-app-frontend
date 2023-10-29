import { Box } from '@mui/material'
import { type ChildrenModel } from 'models'
import { gridContainerStyles } from './grid-container.styled'

export default function GridContainer ({ children }: ChildrenModel) {
  return <Box sx={gridContainerStyles}>{children}</Box>
}
