import { Loader2 } from "lucide-react";

function Button({
  children,
  onClick,
  loading = false,
  disabled = false,
  className = "",
  type = "button"
}) {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        w-full
        bg-black
        text-white
        p-4
        rounded-2xl
        transition
        duration-300
        hover:bg-gray-800
        active:scale-95
        disabled:opacity-70
        flex
        justify-center
        items-center
        gap-3
        ${className}
      `}
    >

      {
        loading ? (
          <>
            <Loader2 className="animate-spin" />
            Loading...
          </>
        ) : (
          children
        )
      }

    </button>
  );
}

export default Button;