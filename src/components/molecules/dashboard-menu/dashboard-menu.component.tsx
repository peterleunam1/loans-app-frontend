import { Box } from '@mui/material'
import { MenuCard } from 'components/atoms'
import debts from '../../../assets/images/borrow.svg'
import pendings from '../../../assets/images/pending.svg'
import loans from '../../../assets/images/personal.svg'
import { boxStyles } from './dashboard-menu.styled'
import { privateRoutes } from 'constant'

const data = [
  {
    title: privateRoutes.LOANS,
    img: loans,
    count: 8
  },
  {
    title: privateRoutes.DEBTS,
    img: debts,
    count: 5
  },
  {
    title: 'pendientes',
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
