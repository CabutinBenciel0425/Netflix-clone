function DownloadCard() {
  return (
    <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
      <img
        src="/stranger-things-sm.png"
        alt="stranger thing image"
        className="h-full"
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-0">
          <span className="text-md lg:text-lg font-bold">Stranger Things</span>
          <span className="text-sm text-blue-500">Downloading...</span>
        </div>
        <img
          src="/download-icon.gif"
          alt="downloading image"
          className="h-12"
        />
      </div>
    </div>
  );
}

export default DownloadCard;
