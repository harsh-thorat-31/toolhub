import { Link } from "react-router-dom";

function ToolCard({ title, description, link }) {

  return (
    <Link to={link}>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300">

        <h2 className="text-2xl font-semibold mb-3">
          {title}
        </h2>

        <p className="text-gray-600">
          {description}
        </p>

      </div>

    </Link>
  );
}

export default ToolCard;