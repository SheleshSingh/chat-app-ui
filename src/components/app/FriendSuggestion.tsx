import useSWR from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"

const FriendSuggestion = () => {
  const { data, error, isLoading } = useSWR("/friend/suggestion", Fetcher)
  console.log(data);
  return (
    <div className="h-62.5 overflow-auto">

      <Card title="suggested" divider>
        
        <div className="space-y-6">
          {
            data && data.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img src={"/images/avt.avif"} alt="avt.avif" className="w-16 h-16 rounded object-cover" />
                <div>
                  <h1 className="text-black font-medium capitalize">{item.fullname}</h1>
                  <button className="font-medium bg-green-400 text-white px-2 py-1 text-xs rounded hover:bg-green-500 mt-1">
                    <i className="ri-user-add-line mr-1"></i>
                    Add Friend
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </Card>
    </div>
  )
}

export default FriendSuggestion