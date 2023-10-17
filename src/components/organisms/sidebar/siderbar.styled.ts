import { styled, type Theme, type CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  height: '100vh',
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

export const BoxContainerStyles = {
  bgcolor: '#D9D9D9',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
}

export const AvatarContainerStyles = (open: boolean) => {
  return {
    width: '100%',
    display: 'flex',
    justifyContent: !open ? 'center' : 'flex-start',
    alignItems: 'center',
    gap: 1,
    ...(open && {
      paddingLeft: 2
    })
  }
}

export const AvatarStyles = {
  width: 38,
  height: 38
}
