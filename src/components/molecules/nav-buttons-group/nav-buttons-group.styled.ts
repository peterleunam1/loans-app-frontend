import { styled } from '@mui/material'

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1.5),
  ...theme.mixins.toolbar,

  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))
