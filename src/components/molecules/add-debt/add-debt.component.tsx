import { Box, Typography } from '@mui/material'
import { boxButtonStyles } from '../add-loan/add-loan.styled'
import { Button, Input } from 'components/atoms'
import { regexs } from 'constant'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined'

const data = [
  {
    label: 'nombre completo',
    regex: regexs.TEXT,
    date: new Date(),
    icon: <AccountCircleOutlinedIcon />
  },
  {
    label: 'Documento de identidad',
    regex: regexs.NUMBERS,
    date: new Date(),
    icon: <DocumentScannerOutlinedIcon />
  },
  {
    label: 'email',
    regex: regexs.EMAIL,
    date: new Date(),
    icon: <AttachEmailOutlinedIcon />
  },
  {
    label: 'teléfono',
    regex: regexs.NUMBERS,
    date: new Date(),
    icon: <PermPhoneMsgOutlinedIcon />
  },
  {
    label: 'ciudad',
    regex: regexs.TEXT,
    date: new Date(),
    icon: <LocationCityOutlinedIcon />
  }
]
export default function AddDebt () {
  return (
    <Box sx={{ width: '85%' }}>
      <form>
        {data.map((item, index) => (
          <Input
            key={index}
            label={item.label}
            regex={item.regex}
            onChange={() => {}}
            icon={item.icon}
          />
        ))}
        <Box sx={boxButtonStyles}>
          <Button
            loading={false}
            text="registrar deudor"
            onClick={() => {}}
            withIcon
          />
          <Typography variant="subtitle2" component="p">
            Mantén tus negocios al dia con loansApp
          </Typography>
        </Box>
      </form>
    </Box>
  )
}
