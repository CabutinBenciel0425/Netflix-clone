function DeviceShowcase() {
  return (
    <div className="flex-1 relative overflow-hidden">
      <img
        src="/device-pile.png"
        alt="device pile image"
        className="mt-4 relative z-10"
      />
      <video
        className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 max-w-[63%]"
        playsInline
        autoPlay={true}
        muted
        loop
      >
        <source src="/video-devices.m4v" type="video/mp4" />
      </video>
    </div>
  );
}

export default DeviceShowcase;
