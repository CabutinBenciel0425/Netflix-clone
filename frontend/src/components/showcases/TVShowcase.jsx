function TVShowcase() {
  return (
    <div className="relative">
      <img src="/tv.png" alt="TV" className="relative z-10" />

      <video
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-vid.m4v" />
      </video>
    </div>
  );
}

export default TVShowcase;
