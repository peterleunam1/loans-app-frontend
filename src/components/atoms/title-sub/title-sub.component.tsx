import { Box, Typography } from '@mui/material'
import { type ChildrenModel } from 'models'

interface TitleSubProps extends ChildrenModel {
  title: string
}

export default function TitleSub ({ children, title }: TitleSubProps) {
  return (
    <Box>
      <Typography component="p" variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      <Typography component="p" variant="subtitle2" fontWeight={400}>
        {children}
      </Typography>
    </Box>
  )
}
