import { Box, Container, Card, Typography } from '@mui/material'
import logo from '../../../assets/images/logo.svg'
import coin from '../../../assets/images/personal.svg'
import { VerticalStepper } from 'components/molecules'
import { Button, Input } from 'components/atoms'
import { publicRoutes, regexs } from 'constant'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppStore } from 'models'
import { useNavigation } from 'hooks'
import { setOwnerToPay } from '../../../redux/states/owner'

export default function PayInit () {
  const [owner, setOwner] = useState<string>('')
  const users = useSelector((store: AppStore) => store.users)
  const dispatch = useDispatch()
  const { goTo } = useNavigation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value)
  }
  const handleSubmit = () => {
    const exist = users.find((item) => item.document === owner as unknown as number)
    if (exist) {
      dispatch(setOwnerToPay(exist))
      goTo(`/${publicRoutes.PAY_ONE}`)
    } else {
      alert('No existe el usuario')
    }
  }
  return (
    <Container sx={{ py: 3 }}>
      <picture>
        <img src={logo} alt="logo" />
      </picture>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <VerticalStepper />
        <Box
          sx={{
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'primary.main',
            borderRadius: 5,
            p: 3
          }}
        >
          <Card
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '95%',
              gap: 2
            }}
          >
            <img src={coin} alt="" />
            <Typography variant="body2" component="p">
              Todas nuestras transacciones están sujetas a confirmación de
              desembolso por parte de la entidad financiera. Por favor verifica
              que tu pago haya sido exitoso al finalizar el proceso.
            </Typography>
          </Card>
          <Box sx={{ bgcolor: '#fff', width: '95%', p: 2, borderRadius: 4 }}>
            <Typography
              variant="subtitle1"
              component="p"
              textAlign="center"
              fontWeight={500}
              sx={{ mt: 4 }}
            >
              Ingresar identificador único
            </Typography>
            <Typography
              variant="body2"
              component="p"
              fontWeight={300}
              sx={{ my: 3 }}
            >
              Este es caracterizado por el numero de identificación del
              prestamista o administrador de la mipyme al cual desea pagar.{' '}
            </Typography>
            <Input
              label="Número de documento"
              icon={<DocumentScannerOutlinedIcon />}
              name="document"
              onChange={handleChange}
              regex={regexs.DOCUMENT}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                mt: 6
              }}
            >
              <Button loading={false} onClick={handleSubmit} text="Continuar" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
