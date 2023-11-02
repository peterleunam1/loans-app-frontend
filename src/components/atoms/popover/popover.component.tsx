import { useState } from 'react'
import { Typography, Popover, Tooltip, Box } from '@mui/material'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import { type ChildrenModel } from 'models'

export default function CustomPopover ({ children }: ChildrenModel) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const id = open ? 'simple-popover' : undefined

  return (
    <Box>
      <span aria-describedby={id} onClick={handleClick}>
        <Tooltip title="Abonar" placement="top" arrow>
          <DriveFileRenameOutlineOutlinedIcon
            sx={{ cursor: 'pointer', color: 'green', ml: 1 }}
          />
        </Tooltip>
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Typography sx={{ p: 2 }}>{children}</Typography>
      </Popover>
    </Box>
  )
}
