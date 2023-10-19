import { AppLayout } from 'components/templates'
import { BoxEnd, Button, Modal } from 'components/atoms'
import { useModal } from 'hooks'

export default function Loans () {
  const { open, setOpen, handleOpen } = useModal()
  return (
    <AppLayout title="Prestamos">
      <BoxEnd>
        <Button text="crear prestamo" withIcon loading={false} onClick={handleOpen} />
      </BoxEnd>
      <Modal open={open} setOpen={setOpen} title='f'>
        <h1>hola</h1>
      </Modal>
    </AppLayout>
  )
}
