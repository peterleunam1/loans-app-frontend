import { Typography } from '@mui/material'
import { BoxEnd, GridContainer, TitleTex } from 'components/atoms'
import { type LoansModel } from 'models'
import {
  calculateInterest,
  getCapitalize,
  getFeeAmount,
  getUnitPrice
} from 'utils'

interface DetailLoansCardProps {
  loan: LoansModel
  dudeDate: Date[]
}

export default function DetailLoansCard ({ loan, dudeDate }: DetailLoansCardProps) {
  const {
    abonos,
    date,
    document,
    frequence,
    fullName,
    id,
    initialAmount,
    interest,
    n_fees: nFees,
    paid_fees: paidFees,
    reason
  } = loan

  const abonosUnits = getUnitPrice(abonos)

  const initialAmountUnits = getUnitPrice(initialAmount)

  const dateParsed = new Date(date).toLocaleDateString()

  const lastDudeParsed = new Date(
    dudeDate[dudeDate.length - 1]
  ).toLocaleDateString()

  const interestEdited = `${interest}%`

  const frecuenceCapitalized = getCapitalize(frequence)

  const reasonCapitalized = getCapitalize(reason)

  const totalAmount: number = calculateInterest({
    initialAmount: initialAmount ?? 0,
    interest: interest ?? 0
  })

  const feeAmount: string = getUnitPrice(
    getFeeAmount({
      initialAmount,
      interest,
      nFees
    })
  )

  const balance: string = `Saldo: ${getUnitPrice(totalAmount - abonos)}`

  return (
    <>
      <GridContainer>
        <TitleTex title="Cliente: ">{fullName}</TitleTex>
        <TitleTex title="Nro. Documento: ">{document}</TitleTex>
        <TitleTex title="Id. préstamo ">{id}</TitleTex>
        <TitleTex title="Valor préstamo: ">{initialAmountUnits}</TitleTex>
        <TitleTex title="Valor total: ">{getUnitPrice(totalAmount)}</TitleTex>
        <TitleTex title="Cantidad de cuotas: ">{nFees}</TitleTex>
        <TitleTex title="Valor cuota: ">{feeAmount}</TitleTex>
        <TitleTex title="Período de la cuota: ">
          {frecuenceCapitalized}
        </TitleTex>
        <TitleTex title="Fecha de inicio: ">{dateParsed}</TitleTex>
        <TitleTex title="Fecha de vecimiento: ">{lastDudeParsed}</TitleTex>
        <TitleTex title="Tasa de interés: ">{interestEdited}</TitleTex>
        <TitleTex title="Cuotas pagadas: ">{paidFees}</TitleTex>
        <TitleTex title="Total Abonos: ">{abonosUnits}</TitleTex>
      </GridContainer>
      <TitleTex title="Descripción: ">{reasonCapitalized}</TitleTex>
      <BoxEnd>
        <Typography
          variant="h5"
          component="p"
          sx={{ mt: 2, color: 'secondary.main' }}
        >
          {balance}
        </Typography>
      </BoxEnd>
    </>
  )
}
