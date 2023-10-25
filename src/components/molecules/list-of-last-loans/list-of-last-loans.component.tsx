import { List, Typography } from '@mui/material'
import { LoanCard } from 'components/atoms'
import {
  LastLoansContainer,
  TypographyStyles,
  listStyles
} from './list-of-last-loans.styled'
import { useSelector } from 'react-redux'
import { type AppStore } from 'models'

export default function ListOfLastLoans () {
  const lastLoans = useSelector((store: AppStore) =>
    store.user_active.loans.slice(-4).reverse()
  )
  return (
    <LastLoansContainer>
      <Typography variant="subtitle1" component="p" sx={TypographyStyles}>
        Ultimos prestamos
      </Typography>
      <List sx={listStyles}>
        {lastLoans.map(({ fullName, date, document }, index) => {
          const subtitle = `Doc.: ${document} - Fecha: ${date}`
          return <LoanCard key={index} name={fullName} email={subtitle} />
        })}
      </List>
    </LastLoansContainer>
  )
}
