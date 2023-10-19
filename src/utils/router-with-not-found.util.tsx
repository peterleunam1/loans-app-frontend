import { Route, Routes } from 'react-router-dom'

interface ChildrenModel {
  children: React.ReactNode
}
export default function RoutesWithNotFound ({ children }: ChildrenModel) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  )
}
