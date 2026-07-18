import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Context from "../../Context";
import { v4 as uuid } from "uuid"
import HttpInterceptor from "../../lib/HttpInterceptor";
import useSWR, { mutate } from "swr";
import Fetcher from "../../lib/Fetcher";
import CatchError from "../../lib/CatchError";
import FriendSuggestion from "./FriendSuggestion";

const EightMinutInMs = 8 * 60 * 1000

const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(300);
  const { session, setSession } = useContext(Context)
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: EightMinutInMs,
    shouldRetryOnError: false
  })

  useEffect(() => {
    if (error) {
      logout()
    }
  }, [error])

  const rightAsideSize = 400;
  const collapseSize = 140;

  const menus = [
    {
      href: "/app/dashboard",
      label: "dashboard",
      icon: "ri-home-9-line",
    },
    {
      href: "/app/my-posts",
      label: "my posts",
      icon: "ri-chat-smile-3-line",
    },
    {
      href: "/app/friends",
      label: "friends",
      icon: "ri-group-line",
    },
  ];

  const logout = async () => {
    try {
      await HttpInterceptor.post("auth/logout")
      navigate("/login")
    }
    catch (err) {
      CatchError(err)
    }
  }

  const getPathname = (path: string) => {
    const firstPath = path.split("/").pop();
    const finalPath = firstPath?.split("-").join(" ");
    return finalPath;
  };

  const uploadImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = async () => {
      if (!input.files)
        return;

      const file = input.files[0]
      const path = `profile-pictures/${uuid()}.png`
      const payload = {
        path,
        type: file.type,
        status:"public-read"
      }
      try {
        const options = {
          headers: {
            "Content-Type": file.type
          }
        }
        const { data } = await HttpInterceptor.post("/storage/upload", payload)
        await HttpInterceptor.put(data.url, file, options)
        const { data: user } = await HttpInterceptor.put("/auth/profile-picture", { path })
        setSession({ ...session, image: user.image })
        mutate("/auth/refresh-token")

      }
      catch (err) {
        console.log(err);
      }
    }

  }

  return (
    <div className="bg-stale-200 min-h-screen">
      <aside
        className="h-full p-6 rounded-xl text-white fixed left-0 top-0"
        style={{
          width: leftAsideSize,
          transition: "0.3s",
        }}
      >
        <div className="space-y-8 h-full overflow-hidden bg-linear-to-t from-gray-500 via-gray-700 to-gray-500 rounded-2xl p-8">
          {leftAsideSize === collapseSize ? (
            <i className="ri-user-fill text-xl text-white animate__animated animate__fadeIn"></i>
          ) : (
            <div className="animate__animated animate__fadeIn">
              {
                session &&
                <Avatar
                  title={session.fullname}
                  subtitle={session.email}
                  image={session.image || "/images/avt.avif"}
                  titleColor="#ffffff"
                  subtitleColor="#ddd"
                  onClick={uploadImage}
                />
              }
            </div>
          )}
          <div>
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="flex items-center gap-4 text-gray-300 py-2 hover:text-white"
              >
                <i className={`${item.icon} text-xl`}></i>
                <label
                  className={`capitalize ${leftAsideSize === collapseSize ? "hidden" : ""}`}
                >
                  {item.label}
                </label>
              </Link>
            ))}

            <button onClick={logout} className="flex items-center gap-3 text-gray-300 py-2 hover:text-white">
              <i className="ri-logout-circle-r-line text-xl"></i>
              <label
                className={`${leftAsideSize === collapseSize ? "hidden" : ""}`}
              >
                Logout
              </label>
            </button>
          </div>
        </div>
      </aside>
      <section
        style={{
          width: leftAsideSize
            ? `calc(100% - ${leftAsideSize + rightAsideSize}px)`
            : collapseSize,
          marginLeft: leftAsideSize,
          transition: "0.3s",
        }}
        className="rounded-2xl h-screen py-6 px-1"
      >
        <Card
          title={
            <div className="flex gap-3 items-center">
              <button
                onClick={() =>
                  setLeftAsideSize(leftAsideSize === 300 ? collapseSize : 300)
                }
                className="bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200"
              >
                {leftAsideSize === collapseSize ? (
                  <i className="ri-arrow-right-line"></i>
                ) : (
                  <i className="ri-arrow-left-line"></i>
                )}
              </button>
              <h1>{getPathname(pathname)}</h1>
            </div>
          }
          divider
        >
          {
            pathname === "/app" ? <Dashboard /> : <Outlet />
          }
        </Card>
      </section>
      <aside
        className="h-full p-8 absolute top-0 right-0 overflow-auto space-y-8"
        style={{ width: rightAsideSize,transition:"0.2s" }}
      >
       <FriendSuggestion/>

        <Card title="Friends" divider>
          <div className="space-y-5">
            {Array(20)
              .fill(0)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 shadow-lg p-3 rounded-xl flex justify-between"
                >
                  <Avatar
                    image="/images/avt.avif"
                    title="Amit kumar"
                    size="md"
                    subtitle={
                      <small
                        className={`${index % 2 === 0 ? "text-zinc-400" : "text-green-400"} font-medium`}
                      >
                        {index % 2 === 0 ? "Offline" : "Online"}
                      </small>
                    }
                  />
                  <div className="space-x-3">
                    <Link to="/app/chat">
                      <button className="hover:text-blue-600 text-blue-500">
                        <i className="ri-chat-ai-line"></i>
                      </button>
                    </Link>

                    <Link to="/app/audio-chat">
                      <button className="hover:text-green-500 text-green-400">
                        <i className="ri-phone-line"></i>
                      </button>
                    </Link>

                    <Link to="/app/video-chat">
                      <button className="hover:text-amber-600 text-amber-500">
                        <i className="ri-video-on-ai-line"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </aside>
    </div>
  );
};

export default Layout;
