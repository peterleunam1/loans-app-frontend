import { BoxEnd, Button, Modal } from 'components/atoms'
import { AppLayout } from 'components/templates'
import { debtsColumns } from 'constant'
import { useModal } from 'hooks'
import { debtsRows } from '../loans/loans'
import { TableGrid } from 'components/organisms'
import { AddDebt } from 'components/molecules'

export default function Debts () {
  const { handleOpen, open, setOpen } = useModal()
  return (
    <AppLayout title="Deudores">
      <BoxEnd>
        <Button
          text="registrar deudor"
          withIcon
          loading={false}
          onClick={handleOpen}
        />
      </BoxEnd>
      <TableGrid columns={debtsColumns} rows={debtsRows} />
      <Modal open={open} setOpen={setOpen} title="registar deudor">
        <AddDebt />
      </Modal>
    </AppLayout>
  )
}
