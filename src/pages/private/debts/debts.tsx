import { BoxEnd, Button, Modal } from 'components/atoms'
import { AppLayout } from 'components/templates'
import { debtsColumns, privateRoutes } from 'constant'
import { useModal } from 'hooks'
import { TableGrid } from 'components/organisms'
import { AddDebt } from 'components/molecules'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'
import { type AppStore } from 'models'

export default function Debts () {
  const { handleOpen, open, setOpen } = useModal()
  const userDebts = useSelector((store: AppStore) => store.user_active.debts)
  const [alert, setAlert] = useState<boolean>(false)
  return (
    <AppLayout title={privateRoutes.DEBTS}>
      {alert && <Alert severity="success" sx={{ mb: 1 }}>Deudor registrado con éxito</Alert>}
      <BoxEnd>
        <Button
          text="registrar deudor"
          withIcon
          loading={false}
          onClick={handleOpen}
        />
      </BoxEnd>
      <TableGrid columns={debtsColumns} rows={userDebts} />
      <Modal open={open} setOpen={setOpen} title="registrar deudor">
        <AddDebt setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </AppLayout>
  )
}
