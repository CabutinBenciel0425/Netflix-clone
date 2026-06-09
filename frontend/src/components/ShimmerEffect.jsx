function ShimmerEffect() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero shimmer */}
      <div className="relative h-screen">
        <div className="shimmer absolute inset-0" />

        {/* Navbar shimmer */}
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4 h-20 relative z-10">
          <div className="shimmer h-8 w-32 sm:w-40 rounded" />
          <div className="flex gap-4 items-center">
            <div className="shimmer h-6 w-6 rounded" />
            <div className="shimmer h-8 w-8 rounded-full" />
            <div className="shimmer h-6 w-6 rounded" />
          </div>
        </div>

        {/* Hero content shimmer */}
        <div className="absolute bottom-32 left-8 md:left-16 lg:left-32 space-y-4 max-w-xl w-full pr-8">
          <div className="shimmer h-12 w-full rounded" />
          <div className="shimmer h-12 w-3/4 rounded" />
          <div className="shimmer h-5 w-28 rounded" />
          <div className="shimmer h-5 w-full rounded" />
          <div className="shimmer h-5 w-5/6 rounded" />
          <div className="flex gap-4 pt-2">
            <div className="shimmer h-10 w-24 rounded" />
            <div className="shimmer h-10 w-32 rounded" />
          </div>
        </div>
      </div>

      {/* Content sliders shimmer */}
      <div className="bg-black py-10 space-y-10 px-5 md:px-20">
        {[1, 2, 3, 4].map((row) => (
          <div key={row}>
            <div className="shimmer h-6 w-48 rounded mb-4" />
            <div className="flex gap-3 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <div
                  key={col}
                  className="shimmer flex-shrink-0 w-40 h-24 rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShimmerEffect;
