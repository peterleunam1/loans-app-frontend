import { Box } from '@mui/material'
import { MenuCard } from 'components/atoms'
import debts from '../../../assets/images/borrow.svg'
import pendings from '../../../assets/images/pending.svg'
import loans from '../../../assets/images/personal.svg'
import { boxStyles } from './dashboard-menu.styled'

const data = [
  {
    title: 'Mis Prestamos',
    img: loans,
    count: 8
  },
  {
    title: 'Deudores',
    img: debts,
    count: 5
  },
  {
    title: 'Pendientes',
    img: pendings,
    count: 2
  }
]

export default function DashboardMenu () {
  return (
    <Box sx={boxStyles}>
      {data.map((elements, index) => (
        <MenuCard key={index} {...elements} />
      ))}
    </Box>
  )
}
