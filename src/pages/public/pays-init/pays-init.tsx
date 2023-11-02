import { Box, Container, Typography } from '@mui/material'
import logo from '../../../assets/images/logo.svg'

export default function PayInit () {
  return (
    <Container sx={{ bgcolor: 'red', py: 3 }}>
        <img src={logo} alt="logo" />
        <Box>
            <Typography variant="h3" component="h2" gutterBottom> pago </Typography>
        </Box>
    </Container>
  )
}
