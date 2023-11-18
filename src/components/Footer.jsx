import { useEffect, useState } from "react";
import Container from "./Container";
import { useSelector, useDispatch } from "react-redux";
import {
  createSubscriber,
  reset,
} from "../features/newsSubscription/newsSubscriptionSlice";
import SubscriptionModal from "./SubscriptionModal";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../utils/toastify";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const {
    subscriberIsError,
    subscriberIsLoading,
    subscriberErrorMessage,
    subscriberIsSuccess,
    subscriberSuccessMessage,
  } = useSelector((state) => state.subscriber);
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (email === "") {
    //   alert("Fill in the email field");
    // }
    setLoading(true);
    dispatch(createSubscriber({ email })).then(() => {
      setLoading(false);
    });
  };
  // console.log(
  //   subscriberIsError,
  //   subscriberIsLoading,
  //   subscriberErrorMessage,
  //   subscriberIsSuccess,
  //   subscriberSuccessMessage
  // );
  useEffect(() => {
    if (subscriberIsError) {
      toast.error(subscriberErrorMessage, toastifyConfig);
    }
    if (subscriberIsSuccess) {
      setShowModal(true);
      setEmail("");
    }
    dispatch(reset());
  }, [
    subscriberIsError,
    subscriberErrorMessage,
    subscriberIsSuccess,
    dispatch,
  ]);
  return (
    <footer className="bg-green-700 min-h-[40vh] py-4 flex items-center justify-center font-montserrat">
      <Container>
        <div className="">
          <h3 className="text-center text-white font-bold text-xl mb-2">
            Stay in touch with our latest updates
          </h3>
          <p className="text-white text-center mb-6">
            Subscribe to our newsletter
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex items-center justify-center space-x-2 w-[300px]  md:w-[500px] mx-auto"
          >
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none rounded-md p-2 md:p-3 outline-none w-full text-black"
            />
            <button
              disabled={loading}
              className="bg-orange-500 text-white rounded-md p-2"
            >
              {loading ? "Processing.." : "Subscribe"}
            </button>
          </form>
          {/* div holding to our website */}
          <div className="text-white flex flex-col items-start  sm:items-center my-7">
            <h3 className="font-bold">
              Care to enroll, know more about us or log into our student's
              portal??
            </h3>
            <p className="mt-2">Click on any of the below links</p>
            <div className="flex flex-col items-start space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-1 mt-4  ">
              <a
                href="https://trainee.dunistech.ng"
                target="_blank"
                className=" text-orange-400 rounded-md p-2"
              >
                Go to Portal
              </a>
              <a
                href="https://dunistech.ng"
                target="_blank"
                className=" text-orange-400 rounded-md p-2"
              >
                Visit Website
              </a>
              <a
                href="https://dunistech.ng/teens/"
                target="_blank"
                className=" text-orange-400 rounded-md p-2"
              >
                Kids/Teens Coding
              </a>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
      {showModal && <SubscriptionModal setShowModal={setShowModal} />}
    </footer>
  );
}

export default Footer;
