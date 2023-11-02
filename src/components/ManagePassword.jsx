import { AiOutlineLock } from "react-icons/ai";

function ManagePassword({ setShowPasswordModal }) {
  return (
    <div className="w-full  mx-auto rounded-md shadow-lg p-4 ">
      <div className="flex items-center mb-7 space-x-7">
        <div className="bg-green-700 rounded-full p-3">
          <AiOutlineLock size={40} color="white" />
        </div>
        <p className="font-bold text-2xl">Security</p>
      </div>
      <div className="flex items-center justify-between  border-b py-3">
        <div className="flex flex-col space-y-3">
          <span className="text-sm text-black font-semibold">Password</span>
          <p>...........</p>
        </div>
        {/* will pop out our profile picture change modal */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="border border-black p-1 transition-all duration-300 ease-in-out text-sm hover:border-orange-500 hover:text-orange-500"
        >
          Change
        </button>
      </div>
    </div>
  );
}

export default ManagePassword;
