function Label({ htmlFor, from, children }) {
  const styles = {
    signup: "text-sm font-medium text-gray-300 block ml-0.5",
  };

  return (
    <label htmlFor={htmlFor} className={styles[from]}>
      {children}
    </label>
  );
}

export default Label;
