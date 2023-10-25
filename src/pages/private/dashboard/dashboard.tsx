import { styled } from '@mui/material'
import { AppLayout } from 'components/templates'
import MuiBox from '@mui/material/Box'
import { DashboardMenu, ListOfLastLoans } from 'components/molecules'
import graphic from '../../../assets/images/graphic.svg'

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
      <DashboardMenu />
      <MainContainer>
        <GraphicContainer>
          <img src={graphic} alt="graphics" style={{ width: '70%' }} />
        </GraphicContainer>
        <ListOfLastLoans />
      </MainContainer>
    </AppLayout>
  )
}
