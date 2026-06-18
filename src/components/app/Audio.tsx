import Button from "../shared/Button";
import Card from "../shared/Card";

const Audio = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <Card title="Er Shelesh">
          <div className="flex flex-col items-center">
            <img
              src="/images/avt.avif"
              alt="avt"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </Card>

        <Card title="Er Lora">
          <div className="flex flex-col items-center">
            <img
              src="/images/avt.avif"
              alt="avt"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl">
          <video className="w-full h-full absolute top-0 left-0"></video>
          <button className="absolute bottom-2 left-2 bg-white/20 text-white text-xs py-1 px-3 rounded-lg">
            Er Shelesh
          </button>
        </div>

        <Button icon="user-add-line">Add</Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-400 hover:text-white">
            <i className="ri-mic-line"></i>
          </button>
        </div>
        <Button icon="close-circle-fill" type="danger">
          End
        </Button>
      </div>
    </div>
  );
};

export default Audio;
