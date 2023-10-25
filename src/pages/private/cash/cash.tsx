import { AppLayout } from 'components/templates'
import { privateRoutes } from 'constant'
import { type AppStore } from 'models'
import { useSelector } from 'react-redux'

export default function Cash () {
  const users = useSelector((store: AppStore) => store.users)
  console.log(users)
  return (
    <AppLayout title={privateRoutes.CASH}>
        <h1></h1>
        {users.map((user) => (
          <div key={user.document}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.document}</p>
            <p>{user.department}</p>
            <p>{user.city}</p>
          </div>
        ))}
    </AppLayout>
  )
}
