function Input({
  type = "text",
  name = "",
  value,
  onChange,
  placeholder = "",
  className = "",
  readOnly = false
}) {

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`
        w-full
        border-2
        border-gray-200
        rounded-2xl
        p-4
        outline-none
        focus:ring-2
        focus:ring-black
        transition
        ${className}
      `}
    />
  );
}

export default Input;