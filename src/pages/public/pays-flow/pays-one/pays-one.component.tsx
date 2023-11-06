import { useSelector } from 'react-redux'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
import { PaymentsLayout } from 'components/templates'
import { type LoansModel, type AppStore } from 'models'
import { Typography, Box, Alert } from '@mui/material'
import { BoxEnd, Button, Input, TitleTex } from 'components/atoms'
import { localStorageTypes, publicRoutes, regexs } from 'constant'
import { useState } from 'react'
import { useNavigation } from 'hooks'
import { persistLocalStorage } from 'utils'

export default function PaysOne () {
  const owner = useSelector((store: AppStore) => store.owner)
  const [client, setClient] = useState<string>('')
  const fullName: string = `${owner.name} ${owner.lastName}`
  const isDisabled: boolean = !regexs.DOCUMENT.test(client)
  const [loadingButton, setLoadingButton] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const { goTo } = useNavigation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value)
  }

  const handleClick = () => {
    setLoadingButton(true)
    const loansFiltered: LoansModel[] = owner.loans.filter((loan) => loan.document === client)
    setTimeout(() => {
      setLoadingButton(false)
      if (loansFiltered.length > 0) {
        persistLocalStorage<LoansModel[]>(localStorageTypes.FILTERED_LOANS_BY_CLIENT, loansFiltered)
        goTo(`/${publicRoutes.PAY_TWO}`)
      } else {
        setError(true)
      }
    }, 1000)
  }

  return (
    <PaymentsLayout activeStep={0}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'primary.main',
          borderRadius: '10px',
          mb: 4
        }}
      >
        <Typography component="h1" variant="h6">
          Entidad identificada
        </Typography>
        <TitleTex title="Nombre del titular: ">{fullName}</TitleTex>
        <TitleTex title="Documento: ">{owner.document}</TitleTex>
        <TitleTex title="Email: ">{owner.email}</TitleTex>
      </Box>
      {error && <Alert sx={{ mb: 2 }} severity="error">Cliente no encontrado</Alert>}
      <Typography component="p" variant="subtitle1" fontWeight={600}>
        Datos del cliente
      </Typography>
      <Typography
        component="p"
        variant="subtitle2"
        fontWeight={400}
        sx={{ mb: 2.5 }}
      >
        Para poder continuar debe ingresar su número de documento para devolver
        su historial de compras.
      </Typography>
      <form
        style={{
          width: '100%',
          height: '28vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}
      >
        <Input
          label="Número de documento"
          regex={regexs.DOCUMENT}
          onChange={handleChange}
          icon={<DocumentScannerOutlinedIcon />}
          name="client"
        />
        <BoxEnd>
          <Button
            text="Continuar proceso"
            onClick={handleClick}
            loading={loadingButton}
            isDisabled={isDisabled}
          ></Button>
        </BoxEnd>
      </form>
    </PaymentsLayout>
  )
}
