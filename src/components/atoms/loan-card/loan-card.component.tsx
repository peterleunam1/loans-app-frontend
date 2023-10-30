import { ListItem, Avatar, Box, Typography } from '@mui/material'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { getFirstChart, getRandomColor } from 'utils'
import { useNavigation } from 'hooks'
import { privateRoutes } from 'constant'
import { avatarStyles, listItemStyles } from './loan-card.styled'

interface LoanCardProps {
  id: number
  name: string
  email: string
}

export default function LoanCard ({ id, name, email }: LoanCardProps) {
  const { goTo } = useNavigation()

  const randomColor = getRandomColor()

  const firstLetter = getFirstChart(name)

  const avatarStyled = {
    ...avatarStyles,
    bgcolor: randomColor
  }
  const handleRedirect = () => {
    goTo(privateRoutes.LOANS_DETAIL.replace(':id', id.toString()))
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
      <RemoveRedEyeOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleRedirect}/>
    </ListItem>
  )
}
