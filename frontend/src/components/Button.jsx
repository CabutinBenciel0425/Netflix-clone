function Button({
  from,
  children,
  type = "button",
  activeTab = "",
  division = "",
  onClick,
}) {
  const styles = {
    signup:
      "w-full py-2 bg-red-600 text-white font-semibold rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-700",
    hero: "bg-red-600 text-lg md:text-lg lg:text-xl px-3 md:px-5 py-2 rounded flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-700",
    search: `py-2 px-4 rounded cursor-pointer transition-all duration-300 ease-in-out ${division === activeTab ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`,
    searchbar:
      "bg-red-600 hover:bg-red-700 text-white p-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out ",
    history:
      "text-gray-500 text-sm border border-gray-500 py-0.5 px-2 rounded-lg cursor-pointer flex flex-row items-center justify-center gap-1 hover:border-gray-300 hover:text-gray-300 transition-all duration-200 ease-in-out",
  };
  return (
    <button className={styles[from]} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
