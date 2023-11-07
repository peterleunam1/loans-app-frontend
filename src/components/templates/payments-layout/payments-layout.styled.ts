import { styled } from '@mui/material'

export const Image = styled('img')(() => ({
  width: '18%'
}))

export const Header = styled('header')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '11vh',
  fontSize: 'calc(.625rem + 2vmin)'
}))

export const logOutStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
  cursor: 'pointer',
  transition: 'bgcolor 0.2s ease',
  padding: '0.6rem',
  borderRadius: '0.7rem',
  ':hover': {
    bgcolor: '#e0e0e0'
  }
}
