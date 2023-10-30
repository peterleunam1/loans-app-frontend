import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material'
import { privateRoutes } from 'constant'
import { useNavigation } from 'hooks'
import { getCapitalize } from 'utils'
import { getSideBarButtonStyles } from './side-bar-button.styled'

interface SideBarButtonProps {
  text: string
  icon: JSX.Element
  open: boolean
}

export default function SideBarButton ({ text, open, icon }: SideBarButtonProps) {
  const { goTo } = useNavigation()

  const textCapitalized = getCapitalize(text)

  let ubication = window.location.pathname.split('/')[2]

  if (ubication === undefined) ubication = 'inicio'

  const navigate = () => {
    if (text === 'inicio') goTo('/')
    else goTo(`/${privateRoutes.PRIVATE}/${text}`)
  }

  const { listItemIconStyles, listItemStyles, listItemTextStyles } =
    getSideBarButtonStyles({
      open,
      ubication,
      text
    })

  return (
    <Tooltip title={text} placement="right" arrow>
      <ListItemButton sx={listItemStyles} onClick={navigate}>
        <ListItemIcon sx={listItemIconStyles}>{icon}</ListItemIcon>
        <ListItemText primary={textCapitalized} sx={listItemTextStyles} />
      </ListItemButton>
    </Tooltip>
  )
}
