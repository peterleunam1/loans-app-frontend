import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material'
import { privateRoutes } from 'constant'
import { useNavigation } from 'hooks'
import { getCapitalize } from 'utils'

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

  return (
    <Tooltip title={text} placement="right" arrow>
      <ListItemButton
        sx={{
          minHeight: 40,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5
        }}
        onClick={navigate}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            fontWeight: 'bolder',
            color: ubication === text ? 'secondary.main' : ''
          }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText
          primary={textCapitalized}
          sx={{ opacity: open ? 1 : 0 }}
        />
      </ListItemButton>
    </Tooltip>
  )
}
