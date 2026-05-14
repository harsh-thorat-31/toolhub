import { useState } from "react";


function Toast({
  message,
  type = "success"
}) {

  return (
    <div
      className={`
        fixed
        top-5
        right-5
        px-6
        py-4
        rounded-2xl
        shadow-xl
        text-white
        z-50

        ${type === "success"
          ? "bg-green-600"
          : "bg-red-500"
        }
      `}
    >
      {message}
    </div>
  );
}

export default Toast;