import { Box, Typography } from '@mui/material'
import { Sidebar } from 'components/organisms'
import { getCapitalize } from 'utils'

interface AppLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AppLayout ({ children, title }: AppLayoutProps) {
  const titleCapitalized = getCapitalize(title)
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, px: 3.5, py: 5, overflow: 'hidden' }}>
        <Typography variant="h4" component="h1"> {titleCapitalized} </Typography>
        <Typography variant="subtitle1" component="p" gutterBottom>
        Lleva el control de tu negocio, justo en un solo lugar.
      </Typography>
        {children}
      </Box>
    </Box>
  )
}
