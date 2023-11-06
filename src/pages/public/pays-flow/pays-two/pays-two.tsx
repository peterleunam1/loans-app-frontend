import { TitleTex } from 'components/atoms'
import { PaymentsLayout } from 'components/templates'
import { localStorageTypes } from 'constant'
import { type UserCompleteModel, type AppStore, type LoansModel } from 'models'
import { useSelector } from 'react-redux'
import { getDudeDates, getLocalStorage } from 'utils'
import { PaymentCard } from 'components/molecules'

export default function PaysTwo () {
  const usersP = useSelector((store: AppStore) => store.users)
  const owner = useSelector((store: AppStore) => store.owner)
  const client = getLocalStorage(
    localStorageTypes.FILTERED_LOANS_BY_CLIENT
  ) as LoansModel[]
  const clientName: string = client[0].fullName
  const clientDocument: string = client[0].document
  const user = usersP.find((user) => user.document === owner.document) as UserCompleteModel
  const loans = user.loans.filter((loan) => loan.document === clientDocument)

  return (
    <PaymentsLayout activeStep={1}>
      <TitleTex title="Nombre del cliente">{clientName}</TitleTex>
      <TitleTex title="Documento">{clientDocument}</TitleTex>
      {loans.map((loan) => {
        const dudeDates = getDudeDates({
          date: loan.date,
          frequence: loan.frequence,
          nFees: loan.n_fees
        })
        return (
          <PaymentCard key={loan.id} loan={loan} dudeDates={dudeDates} />
        )
      })}
    </PaymentsLayout>
  )
}
