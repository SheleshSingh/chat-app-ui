import useSWR, { mutate } from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import { Empty, Skeleton } from "antd"
import Error from "../shared/Error"
import Button from "../shared/Button"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"
import { useState } from "react"
import moment from "moment"
import { toast } from "react-toastify"


interface LoadingInterface {
  state: boolean
  index: null | number
}

const FriendRequest = () => {
  const [loading, setLoadind] = useState<LoadingInterface>({ state: false, index: 0 })
  const { data, error, isLoading } = useSWR("/friend/request", Fetcher)

  const acceptFriendRequest = async (id: string, index: number) => {
    try {
      setLoadind({ state: true, index })
      await HttpInterceptor.put(`/friend/${id}`, { status: "accepted" })
      toast("Friend request accepted !", { position: "top-center" })
      mutate("/friend/request")
      mutate("/friend")

    }
    catch (err) {
      CatchError(err)
    }
    finally {
      setLoadind({ state: false, index: 0 })
    }
  }

  return (
    <div className="h-62.5 overflow-auto">

      <Card title="Friend's request" divider>
        {
          isLoading && <Skeleton active />
        }

        {
          error && <Error message={error.message} />
        }

        {
          data &&
          <div className="space-y-6">
            {
              data.map((item: any, index: number) => (
                <div className="space-y-2">
                  <div key={index} className="flex gap-3 items-center">
                    <img src={item.user.image || "/images/avt.avif"}
                      alt="avt.avif"
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h1 className="text-black font-medium capitalize">{item.user.fullname}</h1>
                      <small>{moment(item.createdAt).format("DD MMM, YYYY")}</small>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    loading={loading.state && loading.index === index}
                    onClick={() => acceptFriendRequest(item._id, index)}
                    type="danger"
                    icon="check-double-line"
                  >
                    Accept
                  </Button>
                </div>
              ))
            }
          </div>
        }
        {
          (data && data.length === 0) && <Empty />
        }
      </Card>
    </div>
  )
}

export default FriendRequest