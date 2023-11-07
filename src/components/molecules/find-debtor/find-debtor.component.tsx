import { Typography } from '@mui/material'
import { BoxEnd, Button, Input } from 'components/atoms'
import { regexs } from 'constant'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
import { Form } from './find-debtor.styled'

interface FindDebtorProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  loadingButton: boolean
  isDisabled: boolean
}
export default function FindDebtor ({ isDisabled, loadingButton, onChange, onClick }: FindDebtorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }
  const handleClick = () => {
    onClick()
  }
  return (
    <>
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
      <Form>
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
      </Form>
    </>
  )
}
