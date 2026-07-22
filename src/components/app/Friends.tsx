import useSWR, { mutate } from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import Error from "../shared/Error"
import { Skeleton } from "antd"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"

const Friends = () => {

  const { data, error, isLoading } = useSWR("/friend", Fetcher)

  if (error)
    return <Error message={error.message} />

  if (isLoading)
    return <Skeleton active />

  const unFriend = async (id: string) => {
    try {
       await HttpInterceptor.delete(`/friend/${id}`)
       mutate("/friend")
   

    } catch (err) {
      CatchError(err)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {data.map((item: any, index: number) => (
        <Card key={index}>
          <div className="flex flex-col items-center gap-3">
            <img src={item.friend.image || "/images/avt.avif"} alt="avt.avif" className="w-16 h-16 rounded-full object-cover" />
            <h1 className="text-base font-medium text-black capitalize">{item.friend.fullname}</h1>
            {
              item.status === "accepted" ?
                <button onClick={() => unFriend(item._id)} className="bg-rose-400 text-white px-2 py-1 text-xs rounded hover:bg-rose-500 font-medium mt-1">
                  <i className="ri-user-minus-line mr-1"></i>
                  Unfriend
                </button> :
                <button className="bg-green-400 text-white px-2 py-1 text-xs rounded hover:bg-gray-400 font-medium mt-1">
                  <i className="ri-check-double-line mr-1"></i>
                  Request sent
                </button>
            }
          </div>
        </Card>
      ))
      }
    </div>
  )
}

export default Friends