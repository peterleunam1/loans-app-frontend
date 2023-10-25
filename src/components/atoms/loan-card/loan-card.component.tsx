import { ListItem, Avatar, Box, Typography } from '@mui/material'
import { getFirstChart, getRandomColor } from 'utils'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { avatarStyles, listItemStyles } from './loan-card.styled'

interface LoanCardProps {
  name: string
  email: string
}

export default function LoanCard ({ name, email }: LoanCardProps) {
  const randomColor = getRandomColor()
  const firstLetter = getFirstChart(name)
  const avatarStyled = {
    ...avatarStyles,
    bgcolor: randomColor
  }

  return (
    <ListItem sx={listItemStyles}>
      <Avatar sx={avatarStyled}>{firstLetter}</Avatar>
      <Box sx={{ textAlign: 'left', width: '82%' }}>
        <Typography variant="subtitle1" component="p">
          {name}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {email}
        </Typography>
      </Box>
      <RemoveRedEyeOutlinedIcon sx={{ cursor: 'pointer' }} />
    </ListItem>
  )
}
