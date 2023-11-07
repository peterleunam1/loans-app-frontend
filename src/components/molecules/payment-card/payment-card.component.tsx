import { Box, Tooltip, Typography } from '@mui/material'
import { type LoansModel } from 'models'
import { getCapitalize, getFeeAmount, getUnitPrice } from 'utils'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { TitleSub } from 'components/atoms'
import { useNavigation } from 'hooks'
import { publicRoutes } from 'constant'

interface PaymentCardProps {
  loan: LoansModel
  dudeDates: Date[]
}
export default function PaymentCard ({ dudeDates, loan }: PaymentCardProps) {
  const { goTo } = useNavigation()
  const {
    id,
    n_fees: nFees,
    interest,
    initialAmount,
    paid_fees: paidFees
  } = loan
  const frecuenceCapitalized = getCapitalize(loan.frequence)
  const feeAmount: string = getUnitPrice(
    getFeeAmount({
      initialAmount,
      interest,
      nFees
    })
  )
  const disabled = paidFees === nFees
  const handleRedirect = (id: number) => {
    goTo(`/${publicRoutes.PAY_THREE.replace(':id', id.toString())}`)
  }
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        py: 2,
        px: 3.5,
        my: 2,
        borderRadius: '10px',
        opacity: disabled ? 0.5 : 1
      }}
    >
      <Typography variant="caption" sx={{ mb: 1 }}>
        <strong>Frecuencia: </strong>
        {frecuenceCapitalized}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <TitleSub title="Id">{id}</TitleSub>
        <TitleSub title="Límite de pago">
          {dudeDates[paidFees].toLocaleDateString()}
        </TitleSub>
        <TitleSub title="Cuotas pagadas">
          {paidFees} / {loan.n_fees}
        </TitleSub>
        <TitleSub title="Valor de la cuota">{feeAmount}</TitleSub>
        <Box>
         {paidFees === nFees
           ? (
            <Tooltip title="Préstamo finalizado" >
          <CheckCircleOutlinedIcon sx={{ color: 'success.main' }}/>
          </Tooltip>
             )
           : (
            <Tooltip title="Pagar cuota" >
         <PaymentsOutlinedIcon
            sx={{ fontSize: '2rem', color: 'success.main', cursor: disabled ? 'not-allowed' : 'pointer' }}
            onClick={() => { handleRedirect(id) }}
          />
          </Tooltip>
             )}
        </Box>
      </Box>
      <Typography
        component="p"
        variant="caption"
        sx={{
          mt: 1,
          width: '100%',
          textAlign: 'right'
        }}
      >
        Proxima cuota:{' '}
        {paidFees + 1 === nFees
          ? 'Última cuota'
          : dudeDates[paidFees + 1].toLocaleDateString()}
      </Typography>
    </Box>
  )
}
