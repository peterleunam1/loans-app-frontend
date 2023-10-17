import { Box } from '@mui/material'
import { Sidebar } from 'components/organisms'

interface AppLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AppLayout ({ children, title }: AppLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>{title}</h1>
        {children}
      </Box>
    </Box>
  )
}
