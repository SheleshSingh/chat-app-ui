import Card from "../shared/Card"

const Friends = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {
        Array(20).fill(0).map((item, index) => (
          <Card key={index}>
            <div className="flex flex-col items-center gap-3">
              <img src="/images/avt.avif" alt="avt.avif" className="w-16 h-16 rounded-full object-cover" />
              <h1 className="text-base font-medium text-black">Er Shelesh mathur</h1>
              <button className="bg-rose-400 text-white px-2 py-1 text-xs rounded hover:bg-rose-500 font-medium mt-1">
                <i className="ri-user-minus-line mr-1"></i>
                Unfriend
              </button>
            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Friends