import { Navigate, Outlet } from "react-router"
import httpInterceptor from "../lib/httpInterceptor"
import { useContext, useEffect } from "react"
import Context from "../Context"

const Guard = () => {
  const { session, setSession } = useContext(Context)

  useEffect(() => {
    getSession()
  }, [])

  const getSession = async () => {
    try {
      const { data } = await httpInterceptor.get("/auth/session")
      setSession(data);
    } catch (err) {
      setSession(false)
    }
  }

  if (session === null)
    return null

  if (session === false)
    return <Navigate to="/login" />

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Guard