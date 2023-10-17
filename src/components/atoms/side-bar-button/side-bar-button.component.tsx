import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material'

interface SideBarButtonProps {
  text: string
  icon: JSX.Element
  open: boolean
}

export default function SideBarButton ({ text, open, icon }: SideBarButtonProps) {
  return (
    <Tooltip title={text} placement="right" arrow>
      <ListItemButton
        sx={{
          minHeight: 40,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            fontWeight: 'bolder'
          }}
        >
          {icon}
        </ListItemIcon>

        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </Tooltip>
  )
}
