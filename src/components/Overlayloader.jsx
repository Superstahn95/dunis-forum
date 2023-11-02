import { Circles } from "react-loader-spinner";

function Overlayloader() {
  return (
    <main className="fixed z-[100] w-full h-full bg-green-700 top-0 left-0 flex items-center justify-center">
      <Circles
        height="80"
        width="80"
        color="#ff9800"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </main>
  );
}

export default Overlayloader;
