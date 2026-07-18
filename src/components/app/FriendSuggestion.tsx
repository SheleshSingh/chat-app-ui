import useSWR from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import { Skeleton } from "antd"
import Error from "../shared/Error"
import Button from "../shared/Button"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"
import { useState } from "react"


interface LoadingInterface {
  state: boolean
  index: null | number
}

const FriendSuggestion = () => {
  const [loading, setLoadind] = useState<LoadingInterface>({ state: false, index: 0 })
  const { data, error, isLoading } = useSWR("/friend/suggestion", Fetcher)

  const sendFriendRequest = async (id: string, index: number) => {
    try {
      setLoadind({ state: true, index })
      const { data } = await HttpInterceptor.post("/friend", { friend: id })
      console.log(data);
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

      <Card title="suggested" divider>
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
                <div key={index} className="flex gap-4">
                  <img src={item.image || "/images/avt.avif"}
                    alt="avt.avif"
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="space-y-2">
                    <h1 className="text-black font-medium capitalize">{item.fullname}</h1>
                    <Button loading={loading.state && loading.index === index} onClick={() => sendFriendRequest(item._id, index)} type="success" icon="user-add-line">Add Friend</Button>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </Card>
    </div>
  )
}

export default FriendSuggestion