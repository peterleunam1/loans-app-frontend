import { useSelector } from 'react-redux'
import { PaymentsLayout } from 'components/templates'
import { type LoansModel, type AppStore } from 'models'
import { Alert } from '@mui/material'
import { localStorageTypes, publicRoutes, regexs } from 'constant'
import { useState } from 'react'
import { useNavigation } from 'hooks'
import { persistLocalStorage } from 'utils'
import { DebtorCard, FindDebtor } from 'components/molecules'

export default function PaysOne () {
  const owner = useSelector((store: AppStore) => store.owner)
  const [client, setClient] = useState<string>('')
  const fullName: string = `${owner.name} ${owner.lastName}`
  const isDisabled: boolean = !regexs.DOCUMENT.test(client)
  const [loadingButton, setLoadingButton] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const { goTo } = useNavigation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value)
  }

  const handleClick = () => {
    setLoadingButton(true)
    const loansFiltered: LoansModel[] = owner.loans.filter(
      (loan) => loan.document === client
    )
    setTimeout(() => {
      setLoadingButton(false)
      if (loansFiltered.length > 0) {
        persistLocalStorage<LoansModel[]>(
          localStorageTypes.FILTERED_LOANS_BY_CLIENT,
          loansFiltered
        )
        goTo(`/${publicRoutes.PAY_TWO}`)
      } else {
        setError(true)
      }
    }, 1000)
  }

  return (
    <PaymentsLayout activeStep={0}>
      <DebtorCard
        document={owner.document}
        email={owner.email}
        name={fullName}
      />
      {error && (
        <Alert sx={{ mb: 2 }} severity="error">Cliente no encontrado</Alert>
      )}
      <FindDebtor
        isDisabled={isDisabled}
        loadingButton={loadingButton}
        onChange={handleChange}
        onClick={handleClick}
      />
    </PaymentsLayout>
  )
}
