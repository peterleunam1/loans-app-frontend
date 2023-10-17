import { IconButton, List } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { SideBarButton } from 'components/atoms'
import { menuData } from 'constant'
import { DrawerHeader } from './nav-buttons-group.styled'

interface NavButtonsGroupProps {
  open: boolean
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
}

export default function NavButtonsGroup ({ open, handleDrawerClose, handleDrawerOpen }: NavButtonsGroupProps) {
  const handleClose = () => {
    handleDrawerClose()
  }

  const handleOpen = () => {
    handleDrawerOpen()
  }

  return (
    <div>
      <DrawerHeader>
        {open
          ? (
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
            )
          : (
          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
            )}
      </DrawerHeader>
      <List>
        {menuData.map(({ text, icon }, index) => (
          <SideBarButton key={index} icon={icon} text={text} open={open} />
        ))}
      </List>
    </div>
  )
}
