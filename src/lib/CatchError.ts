import axios from "axios"
import { toast, type ToastPosition } from "react-toastify"

const CatchError = (err: unknown, position: ToastPosition = "top-center") => {

    if (axios.isAxiosError(err)) // server error hai to ye chalega
        return toast.error(err.response?.data.message, { position })

    if (err instanceof Error)  // frontend error hai to ye chalega
        return toast.error(err.message, { position })

    return toast.error("Network error", { position })
}

export default CatchError