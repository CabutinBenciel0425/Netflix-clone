function Input({
  type,
  from,
  placeholder,
  id,
  value,
  onChange,
  autoFocus = false,
}) {
  const styles = {
    signup:
      "w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring transition-all duration-300 ease-in-out",
    hero: "w-full p-3 lg:p-4 rounded bg-black/80 border border-gray-700 focus:outline-none focus:ring transition-all duration-300 ease-in-out",
    search:
      "w-full p-2 rounded-md bg-gray-900 text-white focus:outline-none focus:ring transition-all duration-300 ease-in-out",
  };

  return (
    <input
      type={type}
      className={styles[from]}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  );
}

export default Input;
