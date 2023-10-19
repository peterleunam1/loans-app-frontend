import { AppLayout } from 'components/templates'
import { BoxEnd, Button, Modal } from 'components/atoms'
import { useModal } from 'hooks'
import { TableGrid } from 'components/organisms'
import { type AddLoanDebts, type DebtsModel, type LoansModel } from 'models'
import { loansColumns } from 'constant'
import { AddLoan } from 'components/molecules'

const rows: LoansModel[] = [
  {
    id: 1,
    fullName: 'Pedro Manuel Agames Rocha',
    document: '1002193429',
    initialAmount: 35000,
    abonos: 37000,
    date: '2021-10-10',
    interest: 10
  }
]
export const debtsRows: DebtsModel[] = [
  {
    id: 1,
    fullName: 'Pedro Manuel Agames Rocha',
    document: '1002193429',
    email: 'lorem@gmail.com',
    city: 'Bogota',
    phone: 1623228
  },
  {
    id: 2,
    fullName: 'Jesus Camilo',
    document: '103193429',
    email: 'lorem@gmail.com',
    city: 'Cartagena',
    phone: 1623228
  }
]

export const debtsNamesAndDocuemnt: AddLoanDebts[] = debtsRows.map((item) => {
  return {
    fullName: item.fullName,
    document: item.document
  }
})
export default function Loans () {
  // const [value, setValue] = useState<string>('')
  // const handleChange = (value: string) => {
  //   setValue(value)
  // }
  const { open, setOpen, handleOpen } = useModal()
  return (
    <AppLayout title="Prestamos">
      <BoxEnd>
        <Button text="crear prestamo" withIcon loading={false} onClick={handleOpen} />
      </BoxEnd>
      <TableGrid columns={loansColumns} rows={rows}/>
      <Modal open={open} setOpen={setOpen} title='crear préstamo'>
      <AddLoan />
      </Modal>
    </AppLayout>
  )
}
