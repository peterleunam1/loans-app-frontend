import { Box, Typography } from '@mui/material'
import { Button, Input } from 'components/atoms'
import credit from '../../../assets/images/credit_card.svg'
import { creditFields } from 'constant'
import { boxStyles, Form, Image } from './pay-card.styled'

interface PaycardProps {
  handlePay: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PayCard ({ handlePay, onChange }: PaycardProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const handleAddPay = () => {
    handlePay()
  }

  return (
    <>
      <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
        Agregar tarjeta
      </Typography>
      <Box sx={boxStyles}>
        <Image src={credit} alt="credit_card" />
        <Form>
          {creditFields.map((fields, index) => (
            <Input {...fields} key={index} onChange={handleChange} />
          ))}
          <Box sx={{ mt: 5 }}>
            <Button
              loading={false}
              text="Pagar"
              onClick={handleAddPay}
              withIcon
            />
          </Box>
        </Form>
      </Box>
    </>
  )
}
