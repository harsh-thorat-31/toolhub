function Card({ children, className = "" }) {

  return (
    <div
      className={`
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;