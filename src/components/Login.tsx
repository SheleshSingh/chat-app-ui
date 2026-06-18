import { Link, useNavigate } from "react-router"
import Button from "./shared/Button"
import Card from "./shared/Card"
import Input from "./shared/Input"
import Form, { type FormDataType } from "./shared/Form"
import httpInterceptor from "../lib/httpInterceptor"
import CatchError from "../lib/CatchError"

const Login = () => {
  const navigate = useNavigate()

  const login = async (values: FormDataType) => {
    try {
      await httpInterceptor.post("/auth/login", values);
      navigate("/app")
    } catch (err: unknown) {

      // if(axios.isAxiosError(err)) // server error hai to ye chalega
      //   return toast.error(err.response?.data.message)

      // if (err instanceof Error)  // frontend error hai to ye chalega
      //   return toast.error(err.message)

      //   toast.error("Network error")
      CatchError(err,)
    }
  }

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-6/12 animate__animated animate__fadeIn">
        <Card noPadding>
          <div className="grid grid-cols-2">
            <div className="p-8 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-black">SIGN IN</h1>
                <p>Start your first chat now !</p>
              </div>

              <Form className="space-y-6" onValue={login}>
                <Input name="email" placeholder="Email id" />
                <Input type="password" name="password" placeholder="Password" />
                <Button icon="arrow-right-up-line">Sign in</Button>
              </Form>

              <div className="flex gap-3">
                <p>Don`t` have an account ?</p>
                <Link to="/signup" className="text-green-400 font-medium hover:underline">Sign up</Link>
              </div>
            </div>
            <div className="overflow-hidden bg-linear-to-t from-sky-500 to-indigo-500 h-125 rounded-r-xl flex justify-center items-center">
              <img src="/images/login.svg" alt="auth" className="w-[70%] animate__animated animate__slideInUp animate__faster" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login