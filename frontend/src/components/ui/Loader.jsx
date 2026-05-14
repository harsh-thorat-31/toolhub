import { Loader2 } from "lucide-react";

function Loader() {

  return (
    <div className="flex justify-center items-center p-10">

      <Loader2
        className="animate-spin"
        size={40}
      />

    </div>
  );
}

export default Loader;