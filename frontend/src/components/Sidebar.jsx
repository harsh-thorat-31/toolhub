import {
  QrCode,
  FileText,
  Lock,
  Link as LinkIcon,
  Code2,
  Image,
  Music,
  Video,
  Brain,
  LogOut,
  Menu
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../context/AuthContext";

function Sidebar({ setSidebarOpen }) {

  const location = useLocation();

  const {
    user,
    logout
  } = useContext(AuthContext);

  const tools = [
    {
      name: "QR Generator",
      icon: <QrCode size={20} />,
      path: "/qr-generator"
    },
    {
      name: "PDF Toolkit",
      icon: <FileText size={20} />,
      path: "/pdf-tools"
    },
    {
      name: "Password Generator",
      icon: <Lock size={20} />,
      path: "/password-generator"
    },
    {
      name: "URL Shortener",
      icon: <LinkIcon size={20} />,
      path: "/url-shortener"
    },
    {
      name: "Code Formatter",
      icon: <Code2 size={20} />,
      path: "/code-tools"
    },
    {
      name: "Image Editor",
      icon: <Image size={20} />,
      path: "/image-editor"
    },
    {
      name: "Resume Analyzer",
      icon: <Brain size={20} />,
      path: "/resume-analyzer"
    },
    {
      name: "Music Editor",
      icon: <Music size={20} />,
      path: "/music-editor"
    },
    {
      name: "Video Downloader",
      icon: <Video size={20} />,
      path: "/video-downloader"
    }
  ];

  return (
    <div className="w-72 md:w-72 bg-black text-white min-h-screen p-4 flex flex-col justify-between">

      <div>

        <div className="flex items-center gap-3 mb-6">

          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <Menu size={28} />
          </button>

    
          <Link to="/">
            <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition">
              ToolHub
            </h1> 
          </Link>

        </div>

        {/* User display information */}

        {
          user && (
            <div className="pb-3 mb-4 text-sm text-gray-400">

              Logged in as

              <span className="block text-white font-semibold">
                {user.username}
              </span>

            </div>
          )
        }

        {/* TOOLS */}

        <div className="space-y-3">

          {
            tools.map((tool, index) => (

              <Link
                key={index}
                to={tool.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  transition

                  ${
                    location.pathname === tool.path
                      ? "bg-white text-black"
                      : "hover:bg-gray-800"
                  }
                `}
              >

                {tool.icon}

                <span>
                  {tool.name}
                </span>

              </Link>
            ))
          }

        </div>

      </div>

      {/* LOGOUT */}

      {
        user && (

          <div className="mt-6">

            <button onClick={logout} className="flex items-center mb-2 gap-3 p-3 rounded-xl hover:bg-red-600 transition w-full border-2 bg-red-700">

              <LogOut size={20} />

              Logout

            </button>

          </div>
        )
      }

    </div>
  );
}

export default Sidebar;