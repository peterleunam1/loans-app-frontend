import { Typography, Popover, Tooltip } from '@mui/material'
import { type ChildrenModel } from 'models'
import { useState } from 'react'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'

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
      <div>
        <span aria-describedby={id} onClick={handleClick}>
        <Tooltip title='Abonar' placement="top" arrow>
           <DriveFileRenameOutlineOutlinedIcon sx={{ cursor: 'pointer', color: 'green', ml: 1 }}/>
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
      </div>
  )
}
