import { Box, Typography } from '@mui/material'
import { TitleTex } from 'components/atoms'
import { containerStyles } from './debtor-card.styled'

interface DebtorCardProps {
  name: string
  document: number
  email: string
}

export default function DebtorCard ({ document, email, name }: DebtorCardProps) {
  return (
    <Box sx={containerStyles}>
      <Typography component="h1" variant="h6">
        Entidad identificada
      </Typography>
      <TitleTex title="Nombre del titular: ">{name}</TitleTex>
      <TitleTex title="Documento: ">{document}</TitleTex>
      <TitleTex title="Email: ">{email}</TitleTex>
    </Box>
  )
}
