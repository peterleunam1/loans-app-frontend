import { styled } from '@mui/material'

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 5,
  borderRadius: 2,
  p: 4
}
export const childrenStyles = {
  mt: 1,
  display: 'flex',
  justifyContent: 'center'
}
export const Image = styled('img')(({ theme }) => ({
  width: '110px',
  [theme.breakpoints.down('sm')]: {
    width: '100px'
  }
}))
export const closeIconStyles = {
  cursor: 'pointer',
  fontSize: '14px'
}
