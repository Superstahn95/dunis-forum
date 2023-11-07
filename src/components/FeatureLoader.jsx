import { Circles } from "react-loader-spinner";

function FeatureLoader({ text = "Loading" }) {
  return (
    <div className="fixed z-[100] top-0 left-0 w-full h-full bg-black/60 flex flex-col items-center justify-center font-montserrat space-y-3">
      <h2 className="text-white font-bold text-center text-xl md:text-3xl">
        {text}
      </h2>
      <Circles
        height="80"
        width="80"
        color="#ff9800"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default FeatureLoader;
