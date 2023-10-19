import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'
import { privateRoutes } from './routes.constant'

export const menuData = [
  {
    text: 'inicio',
    icon: <HomeOutlinedIcon />
  },
  {
    text: privateRoutes.LOANS,
    icon: <MonetizationOnOutlinedIcon />
  },
  {
    text: 'contado',
    icon: <VpnKeyOutlinedIcon />
  },
  {
    text: privateRoutes.DEBTS,
    icon: <PersonRemoveOutlinedIcon />
  },
  {
    text: 'pagos',
    icon: <PaymentsOutlinedIcon />
  },
  {
    text: 'configuración',
    icon: <SettingsOutlinedIcon />
  }
]
