import { Box } from '@mui/material'
import { type ChildrenModel } from 'models'
import { boxEndStyles } from './box-end.styled'

export default function BoxEnd ({ children }: ChildrenModel) {
  return <Box sx={boxEndStyles}>{children}</Box>
}
