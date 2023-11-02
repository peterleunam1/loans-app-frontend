import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { cardMenuData, privateRoutes } from 'constant'
import { MenuCard } from 'components/atoms'
import { boxStyles } from './dashboard-menu.styled'
import { type AppStore } from 'models'

export default function DashboardMenu () {
  const { loans, debts } = useSelector((store: AppStore) => store.user_active)

  const getCount = (title: string) => {
    return title === privateRoutes.LOANS
      ? loans.length
      : title === privateRoutes.DEBTS
        ? debts.length
        : 0
  }

  return (
    <Box sx={boxStyles}>
      {cardMenuData.map(({ title, img }, index) => (
        <MenuCard
          key={index}
          title={title}
          img={img}
          count={getCount(title)}
        />
      ))}
    </Box>
  )
}
