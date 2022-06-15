function TextArea({ name, className, children, ...rest }) {
  return (
    <div className="outline outline-none relative w-full focus:outline-none">
      <textarea
        name={name}
        id={name}
        className={`block p-4 w-full rounded appearance-none ring-0 focus:ring-0 bg-transparent ${className || ""}`}
        style={{ border: "1px solid #0000001F", color: "#00000099" }}
        {...rest}
      />
      <label htmlFor={name} className="absolute top-0 text-lg bg-white p-4 -z-1 duration-300 origin-0" style={{ color: "#00000099" }}>
        {children}
      </label>
    </div>
  );
}

export default TextArea;
