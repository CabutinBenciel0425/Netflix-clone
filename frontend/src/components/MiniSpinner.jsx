import { Loader } from "lucide-react";

function MiniSpinner() {
  return (
    <div className="flex justify-center items-center bg-black h-full">
      <Loader className="animate-spin text-red-600 size-10" />
    </div>
  );
}

export default MiniSpinner;
