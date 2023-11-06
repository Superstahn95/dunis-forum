import successful from "../assets/images/successfully-done.png";
import { XMarkIcon } from "@heroicons/react/24/solid";

function SubscriptionModal({ setShowModal }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center ">
      <div className="bg-white rounded-md font-montserrat p-4 flex flex-col items-center space-y-4 relative">
        <div
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700"
        >
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        </div>
        <img src={successful} alt="done" className="w-[50px] h-[50px]" />
        <p className="font-bold text-xl text-center md:text-2xl">
          Thanks for subscribing to our newsletter{" "}
        </p>
        <p className="text-sm md:text-xl">
          We promise not to spam your inbox 📨{" "}
        </p>
      </div>
    </div>
  );
}

export default SubscriptionModal;
