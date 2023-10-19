import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { BoxEnd } from '..'
import CloseIcon from '@mui/icons-material/Close'
import { type ChildrenModel } from 'models'
import { getCapitalize } from 'utils'
import { modalStyle } from './modal.styled'

interface ModalProps extends ChildrenModel {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}

export default function TransitionsModal ({ open, setOpen, title, children }: ModalProps) {
  const titleCapitalized = getCapitalize(title)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <BoxEnd>
              <CloseIcon
                sx={{ cursor: 'pointer', fontSize: '14px' }}
                onClick={handleClose}
              />
            </BoxEnd>
            <Typography id="transition-modal-title" variant="h6" component="h3">
              {titleCapitalized}
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2 }}>
              {children}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
