import { Navigate, Outlet } from "react-router"
import httpInterceptor from "../lib/HttpInterceptor"
import { useContext, useEffect } from "react"
import Context from "../Context"

const RedirectGuard = () => {
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
        return <Outlet />

    return <Navigate to={"/app"} />

}

export default RedirectGuard