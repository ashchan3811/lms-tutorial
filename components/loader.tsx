import { Loader2 } from "lucide-react";

const LoaderComponent = () => {
  return (
    <div className="h-full w-full bg-transparent z-[100] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-secondary text-slate-900" />
    </div>
  );
};

export default LoaderComponent;
