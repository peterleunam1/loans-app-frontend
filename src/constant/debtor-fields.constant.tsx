import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined'
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined'
import { regexs } from './regexs.constant'
import { type DebtsFieldsModel } from 'models'

export const debtsFields: DebtsFieldsModel[] = [
  {
    label: 'nombre completo',
    regex: regexs.TEXT,
    date: new Date(),
    icon: <AccountCircleOutlinedIcon />,
    name: 'fullName'
  },
  {
    label: 'Documento de identidad',
    regex: regexs.DOCUMENT,
    date: new Date(),
    icon: <DocumentScannerOutlinedIcon />,
    name: 'document'
  },
  {
    label: 'email',
    regex: regexs.EMAIL,
    date: new Date(),
    icon: <AttachEmailOutlinedIcon />,
    name: 'email'
  },
  {
    label: 'teléfono',
    regex: regexs.PHONE,
    date: new Date(),
    icon: <PermPhoneMsgOutlinedIcon />,
    name: 'phone'
  },
  {
    label: 'ciudad',
    regex: regexs.TEXT,
    date: new Date(),
    icon: <LocationCityOutlinedIcon />,
    name: 'city'
  }
]
