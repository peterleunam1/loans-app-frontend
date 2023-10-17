import { Typography, styled } from '@mui/material'
import { AppLayout } from 'components/templates'
import MuiBox from '@mui/material/Box'
import { DashboardMenu, ListOfLastLoans } from 'components/molecules'

const MainContainer = styled(MuiBox)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}))
const GraphicContainer = styled(MuiBox)(({ theme }) => ({
  width: '68%',
  display: 'flex',
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))

export default function Dashboard () {
  return (
    <AppLayout title="dashboard">
      <Typography variant="subtitle1" component="p" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing.
      </Typography>
      <DashboardMenu />
      <MainContainer>
        <GraphicContainer>
          <Typography variant="body2" component="p" gutterBottom>
            gráfica
          </Typography>
        </GraphicContainer>
        <ListOfLastLoans />
      </MainContainer>
    </AppLayout>
  )
}
