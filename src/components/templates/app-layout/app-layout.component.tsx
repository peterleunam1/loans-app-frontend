import { Box, Typography } from '@mui/material'
import { Sidebar } from 'components/organisms'

interface AppLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AppLayout ({ children, title }: AppLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 5 }}>
        <Typography variant="h5" component="h1"> {title} </Typography>
        {children}
      </Box>
    </Box>
  )
}
