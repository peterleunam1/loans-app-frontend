import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined'
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined'
import { regexs } from './regexs.constant'

export const loanFields = [
  {
    name: 'initialAmount',
    label: 'monto de dinero a prestar',
    regex: regexs.NUMBERS,
    icon: <AttachMoneyOutlinedIcon />
  },
  {
    name: 'interest',
    label: 'interest',
    regex: regexs.NUMBERS,
    icon: <TrendingUpOutlinedIcon />
  },
  {
    name: 'n_fees',
    label: 'número de cuotas',
    regex: regexs.NUMBERS,
    icon: <FormatListNumberedOutlinedIcon />
  },
  {
    name: 'reason',
    label: 'razón',
    regex: regexs.TEXT,
    icon: <TextFieldsOutlinedIcon />
  }
]

export const frecuencesData = ['Quincenal', 'Mensual']
