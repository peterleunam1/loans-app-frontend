import { Box } from '@mui/material'
import { MenuCard } from 'components/atoms'
import debts from '../../../assets/images/borrow.svg'
import pendings from '../../../assets/images/pending.svg'
import loans from '../../../assets/images/personal.svg'
import { boxStyles } from './dashboard-menu.styled'
import { privateRoutes } from 'constant'
import { useSelector } from 'react-redux'
import { type AppStore } from 'models'

const data = [
  {
    title: privateRoutes.LOANS,
    img: loans
  },
  {
    title: privateRoutes.DEBTS,
    img: debts
  },
  {
    title: 'pendientes',
    img: pendings
  }
]

export default function DashboardMenu () {
  const { loans, debts } = useSelector((store: AppStore) => store.user_active)

  return (
    <Box sx={boxStyles}>
      {data.map(({ title, img }, index) => (
        <MenuCard key={index} title={title} img={img} count={
          title === privateRoutes.LOANS
            ? loans.length
            : title === privateRoutes.DEBTS
              ? debts.length
              : 0
        }/>
      ))}
    </Box>
  )
}
