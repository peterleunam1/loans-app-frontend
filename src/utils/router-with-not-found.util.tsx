import { type ChildrenModel } from 'models'
import { Route, Routes } from 'react-router-dom'

export default function RoutesWithNotFound ({ children }: ChildrenModel) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  )
}
