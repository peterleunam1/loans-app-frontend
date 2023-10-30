interface SideBarButtonStylesParams {
  open: boolean
  text: string
  ubication: string
}
export const getSideBarButtonStyles = ({ open, text, ubication }: SideBarButtonStylesParams) => {
  const listItemStyles = {
    minHeight: 40,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5
  }

  const listItemIconStyles = {
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
    fontWeight: 'bolder',
    color: ubication === text ? 'secondary.main' : ''
  }

  const listItemTextStyles = { opacity: open ? 1 : 0 }

  return { listItemStyles, listItemIconStyles, listItemTextStyles }
}
