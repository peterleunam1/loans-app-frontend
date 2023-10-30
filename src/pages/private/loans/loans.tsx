import { useState } from 'react'
import { Alert } from '@mui/material'
import { BoxEnd, Button, Modal } from 'components/atoms'
import { AddLoan } from 'components/molecules'
import { TableGrid } from 'components/organisms'
import { AppLayout } from 'components/templates'
import { useLoansTable, useModal } from 'hooks'
import { privateRoutes } from 'constant'

export default function Loans () {
  const [alert, setAlert] = useState<boolean>(false)

  const { open, setOpen, handleOpen } = useModal()

  const { loansColumns, userLoans } = useLoansTable()

  const addLoan: string = 'crear préstamo'

  return (
    <AppLayout title={privateRoutes.LOANS}>
      {alert && (
        <Alert severity="success" sx={{ mb: 1 }}>Prestamo creado con éxito</Alert>
      )}
      <BoxEnd>
        <Button text={addLoan} withIcon loading={false} onClick={handleOpen} />
      </BoxEnd>
      <TableGrid columns={loansColumns} rows={userLoans.loans} />
      <Modal open={open} setOpen={setOpen} title={addLoan}>
        <AddLoan setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </AppLayout>
  )
}
