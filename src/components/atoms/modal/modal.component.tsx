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
import LOGO from '../../../assets/images/logo.svg'
import { styled } from '@mui/material'

interface ModalProps extends ChildrenModel {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}
const Image = styled('img')(({ theme }) => ({
  width: '110px',
  [theme.breakpoints.down('sm')]: {
    width: '100px'
  }
}))

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
            <Image src={LOGO} alt="logo" />
            <BoxEnd>
              <CloseIcon
                sx={{ cursor: 'pointer', fontSize: '14px' }}
                onClick={handleClose}
              />
            </BoxEnd>
            <Typography id="transition-modal-title" variant="h6" component="h3" textAlign='center'>
              {titleCapitalized}
            </Typography>
            <Box id="transition-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              {children}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
