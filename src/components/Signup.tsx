import { Link, useNavigate } from "react-router"
import Button from "./shared/Button"
import Card from "./shared/Card"
import Input from "./shared/Input"
import type { FormDataType } from "./shared/Form"
import Form from "./shared/Form"
import httpInterceptor from "../lib/httpInterceptor"

const Signup = () => {
  const navigate = useNavigate()

  const signup = async (value: FormDataType) => {
    try {
      await httpInterceptor.post("/auth/signup", value)
      navigate("/login")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="w-6/12 animate__animated animate__fadeIn">
        <Card noPadding>
          <div className="grid grid-cols-2">
            <div className="p-8 space-y-6">
              <div>
                <h1 className="text-xl font-bold text-black">SIGN UP</h1>
                <p>Start your first chat now !</p>
              </div>

              <Form className="space-y-6" onValue={signup}>
                <Input name="fullname" placeholder="Fullname" />
                <Input name="email" placeholder="Email id" />
                <Input type="password" name="password" placeholder="Password" />
                <Input name="mobile" placeholder="Mobile" />
                <Button icon="arrow-right-up-line">Sign up</Button>
              </Form>

              <div className="flex gap-3">
                <p>Already have an account ?</p>
                <Link to="/login" className="text-green-400 font-medium hover:underline">Sign in</Link>
              </div>
            </div>
            <div className="overflow-hidden bg-linear-to-t from-sky-500 to-indigo-500 h-125 rounded-r-xl flex justify-center items-center">
              <img src="/images/auth.svg" alt="auth" className="full animate__animated animate__slideInUp animate__faster" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Signup