import { useSelector } from 'react-redux'
import { List, Typography } from '@mui/material'
import { LoanCard } from 'components/atoms'
import {
  LastLoansContainer,
  TypographyStyles,
  listStyles
} from './list-of-last-loans.styled'
import { type AppStore } from 'models'

export default function ListOfLastLoans () {
  const user = useSelector((store: AppStore) => store.user_active)

  const lastLoans = user.loans.slice(-4).reverse()

  return (
    <LastLoansContainer>
      <Typography variant="subtitle1" component="p" sx={TypographyStyles}>
        Ultimos prestamos
      </Typography>
      <List sx={listStyles}>
        {lastLoans.map(({ fullName, date, document, id }, index) => {
          const dateFormated = new Date(date).toLocaleDateString()
          const subtitle = `Doc.: ${document} - Fecha: ${dateFormated}`

          return (
            <LoanCard key={index} id={id} name={fullName} email={subtitle} />
          )
        })}
      </List>
    </LastLoansContainer>
  )
}
