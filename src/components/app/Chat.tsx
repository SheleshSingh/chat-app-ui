import Avatar from "../shared/Avatar";
import Input from "../shared/Input";

const Chat = () => {
  return (
    <div>
      <div className="h-125 overflow-auto space-y-12">
        {Array(20)
          .fill(0)
          .map((item, index) => (
            <div key={index} className="space-y-12">
              <div className="flex gap-4 items-start">
                <Avatar image="/images/avt.avif" size="md" />
                <div className="relative bg-rose-50 px-4 py-2 rounded-lg flex-1 text-pink-500 border border-rose-100">
                  <h1 className="font-medium text-black">Er Shelesh</h1>
                  <label>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime, Lorem ipsum dolor sit amet Lorem ipsum dolor sit
                    amet consectetur
                  </label>
                  <i className="ri-arrow-left-s-fill absolute top-0 -left-5 text-rose-50 text-4xl"></i>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="relative bg-violet-50 px-4 py-2 rounded-lg flex-1 text-blue-500 border border-violet-100">
                  <h1 className="font-medium text-black">Er Lora</h1>
                  <label>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime, Lorem ipsum dolor sit amet Lorem ipsum dolor sit
                    amet consectetur
                  </label>
                  <i className="ri-arrow-right-s-fill absolute top-0 -right-5 text-rose-50 text-4xl"></i>
                </div>
                <Avatar image="/images/avt.avif" size="md" />
              </div>
            </div>
          ))}
      </div>
      <div className="p-3 flex gap-4">
        <form className="flex gap-4 flex-1">
          <Input name="message" placeholder="Type your message here" />
          <button className="w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <i className="ri-send-plane-fill"></i>
          </button>
        </form>
        <button className="w-12 h-12 bg-rose-50 rounded-full hover:bg-rose-400 hover:text-white">
          <i className="ri-attachment-2"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
