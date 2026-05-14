import { useState } from "react";

import ToolCard from "../components/ToolCard";
import SearchBar from "../components/SearchBar";

function Home() {

  const [search, setSearch] = useState("");

  const tools = [
    {
      title: "QR Generator",
      description: "Generate QR codes instantly",
      link: "/qr-generator"
    },
    {
      title: "PDF Toolkit",
      description: "Merge, split and compress PDFs",
      link: "/pdf-tools"
    },
    {
      title: "Password Generator",
      description: "Generate secure passwords",
      link: "/password-generator"
    },
    {
      title: "URL Shortener",
      description: "Shorten long URLs",
      link: "/url-shortener"
    },
    {
      title: "Code Formatter",
      description: "Beautify and minify code",
      link: "/code-tools"
    },
    {
      title: "Image Editor",
      description: "Resize and edit images",
      link: "/image-editor"
    },
    {
      title: "Music Editor",
      description: "Trim and modify audio",
      link: "/music-editor"
    },
    {
      title: "Video Downloader",
      description: "Download videos from links",
      link: "/video-downloader"
    }
  ];

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8 w-full">

      <h1 className="text-4xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        All your tools in one place
      </p>

      <div className="mb-8">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
          filteredTools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              link={tool.link}
            />
          ))
        }

      </div>

    </div>
  );
}

export default Home;