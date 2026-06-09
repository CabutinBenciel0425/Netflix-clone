function FeatureSection({ title, description, reverse = false, children }) {
  return (
    <div className="py-10 bg-black text-white">
      <div
        className={`flex max-w-6xl mx-auto items-center justify-center px-4 md:px-2 ${
          reverse ? "md:flex-row-reverse flex-col" : "md:flex-row flex-col"
        }`}
      >
        <div className="flex-1 text-center md:text-left md:px-2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h2>

          <p className="text-lg md:text-xl">{description}</p>
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default FeatureSection;
