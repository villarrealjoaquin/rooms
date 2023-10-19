import { Route, Routes } from "react-router-dom"
import { Loading } from "../components"

export const RouterWithNotFound = ({ children }: { children: React.ReactNode }) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Loading />} />
    </Routes>
  )
}