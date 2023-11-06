import { Container, Typography, Box } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { type ChildrenModel } from 'models'
import { HorizontalStepper } from 'components/molecules'
import { Header, Image, logOutStyles } from './payments-layout.styled'
import logo from '../../../assets/images/logo.svg'
import { useDispatch } from 'react-redux'
import { clearOwnerToPay } from '../../../redux/states/owner'
import { useNavigation } from 'hooks'
import { publicRoutes } from 'constant'

interface PaymentsLayoutProps extends ChildrenModel {
  activeStep: number
}

export default function PaymentsLayout ({ activeStep, children }: PaymentsLayoutProps) {
  const dispatch = useDispatch()
  const { goTo } = useNavigation()
  const handleLogOut = () => {
    dispatch(clearOwnerToPay())
    goTo(`/${publicRoutes.PAY_INIT}`)
  }
  return (
    <Container>
      <Header>
        <Image src={logo} alt="logo" />
        <Box sx={logOutStyles} onClick={handleLogOut}>
          <Typography variant="subtitle1" component="p">
            Salir
          </Typography>
          <ExitToAppIcon />
        </Box>
      </Header>
      <HorizontalStepper activeStep={activeStep} />
      {children}
    </Container>
  )
}
