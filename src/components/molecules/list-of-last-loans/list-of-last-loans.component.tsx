import { List, Typography } from '@mui/material'
import { LoanCard } from 'components/atoms'
import {
  LastLoansContainer,
  TypographyStyles,
  listStyles
} from './list-of-last-loans.styled'

const demos = [
  {
    name: 'Pedro Manuel Agames Rocha',
    email: 'lormdbamsms@gmail.com'
  },
  {
    name: 'Jesus Camilo Toledo Rangel',
    email: 'lormdbamsms@gmail.com'
  },
  {
    name: 'Jose Luis De Ávila Mercado',
    email: 'lormdbamsms@gmail.com'
  }
]

export default function ListOfLastLoans () {
  return (
    <LastLoansContainer>
      <Typography variant="subtitle1" component="p" sx={TypographyStyles}>
        Ultimos prestamos
      </Typography>
      <List sx={listStyles}>
        {demos.map((demo, index) => (
          <LoanCard key={index} {...demo} />
        ))}
      </List>
    </LastLoansContainer>
  )
}
