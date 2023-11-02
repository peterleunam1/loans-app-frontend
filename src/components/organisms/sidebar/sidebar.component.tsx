import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'
import { NavButtonsGroup } from 'components/molecules'
import {
  AvatarContainerStyles,
  AvatarStyles,
  BoxContainerStyles,
  Drawer
} from './siderbar.styled'
import { useSelector } from 'react-redux'
import { type AppStore } from 'models'
import { getFirstChart } from 'utils'

export default function Sidebar () {
  const [open, setOpen] = useState<boolean>(false)

  const avatarContainerStyled = AvatarContainerStyles(open)

  const { name, lastName } = useSelector((store: AppStore) => store.user_active)

  const firstLetter: string = getFirstChart(name)

  const fullName: string = `${name} ${lastName}`

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Drawer variant="permanent" open={open}>
      <Box sx={BoxContainerStyles}>
        <NavButtonsGroup
          open={open}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Box sx={avatarContainerStyled}>
          <Avatar sx={AvatarStyles}>{firstLetter}</Avatar>
          {open && <Typography sx={{ fontWeight: 'bold' }}>{fullName}</Typography>}
        </Box>
      </Box>
    </Drawer>
  )
}
