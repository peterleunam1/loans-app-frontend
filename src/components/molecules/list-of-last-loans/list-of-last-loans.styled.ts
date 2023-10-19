import { styled } from '@mui/material'
import MuiCard from '@mui/material/Card'

export const listStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  width: '90%'
}
export const LastLoansContainer = styled(MuiCard)(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '8px',
  padding: '25px 0',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '50px'
  }
}))
export const TypographyStyles = {
  width: '80%',
  marginBottom: 1,
  textAlign: 'center',
  borderRadius: '8px'
}
