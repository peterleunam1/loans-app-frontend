import { AppLayout } from 'components/templates'
import { privateRoutes } from 'constant'

export default function Settings () {
  return (
    <AppLayout title={privateRoutes.SETTINGS}>
        <h1>Settings</h1>
    </AppLayout>
  )
}
