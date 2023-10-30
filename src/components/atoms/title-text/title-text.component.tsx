import { Typography } from '@mui/material'
import { type ChildrenModel } from 'models'

interface TitleTextProps extends ChildrenModel {
  title: string
}
export default function TilteText ({ children, title }: TitleTextProps) {
  return (
    <Typography variant="body2" component="p">
      <Typography variant='subtitle2' component="strong">{title}: </Typography>
      {children}
    </Typography>
  )
}
