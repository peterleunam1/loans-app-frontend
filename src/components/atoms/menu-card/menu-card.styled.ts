import { styled } from '@mui/material'
import MuiCard from '@mui/material/Card'

export const Card = styled(MuiCard)(({ theme }) => ({
  width: '32%',
  minHeight: 100,
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 12,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.035)'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))

export const Image = styled('img')(({ theme }) => ({
  width: '48px',
  height: '48px',
  marginLeft: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '30px',
    height: '30px'
  }
}))

export const contentStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContente: 'centter',
  gap: 3,
  mb: 1
}
