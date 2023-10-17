import { styled } from '@mui/material'
import MuiBox from '@mui/material/Box'

export const listStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  width: '100%'
}
export const LastLoansContainer = styled(MuiBox)(({ theme }) => ({
  width: '32%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '50px'
  }
}))
export const TypographyStyles = {
  width: '100%',
  marginBottom: 1,
  bgcolor: '#D9D9D9',
  textAlign: 'center',
  borderRadius: '8px'
}
