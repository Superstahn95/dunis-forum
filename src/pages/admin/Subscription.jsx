import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import {
  deleteSubscriber,
  getAllSubscribers,
  reset,
} from "../../features/newsSubscription/newsSubscriptionSlice";
import FeatureLoader from "../../components/FeatureLoader";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../../utils/toastify";

function Subscription() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingRows, setLoadingRows] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const {
    subscribers,
    subscriberIsError,
    subscriberIsLoading,
    subscriberErrorMessage,
    subscriberIsSuccess,
  } = useSelector((state) => state.subscriber);
  const handleDelete = (id) => {
    const newLoadingRows = { ...loadingRows };
    newLoadingRows[id] = true;
    setLoadingRows(newLoadingRows);
    setLoading(true);
    dispatch(deleteSubscriber(id)).then(() => {
      setLoading(false);
      newLoadingRows[id] = false;
      setLoadingRows(newLoadingRows);
    });
  };
  const columns = [
    { name: "Email", selector: (row) => row.email },
    {
      name: "SignUp Date",
      selector: (row) => dateFormat(row.createdAt, "longDate"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1">
          <button
            disabled={loading}
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 w-20 text-xs rounded-md text-white px-2 py-2"
          >
            {loadingRows[row._id] ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (!dataFetched) {
      dispatch(getAllSubscribers());
      setDataFetched(true);
    }
    if (subscriberIsError) {
      toast.error(subscriberErrorMessage, toastifyConfig);
    }
    // const resetTimeout = setTimeout(() => {
    //   dispatch(reset());
    // }, 500);
    // return () => {
    //   clearTimeout(resetTimeout);
    // };
    dispatch(reset());
  }, [subscriberIsError, dispatch, subscriberErrorMessage, dataFetched]);
  console.log(subscriberIsSuccess);
  return (
    <div className="font-montserrat">
      <h2 className=" font-bold text-2xl">Newsletter Subscribers Collection</h2>
      {subscriberIsLoading ? (
        <FeatureLoader text="Fetching Newsletter Subscribers" />
      ) : subscribers ? (
        <div className="grid col-1 bg-white shadow-sm  font-montserrat mt-8">
          <Table tableHeaders={columns} tableDetails={subscribers} />
        </div>
      ) : (
        <div className="w-full p-4 bg-red-400 flex items-center jusify-center">
          <p>No available subscribers </p>
        </div>
      )}
      {/* <FeatureLoader /> */}
      <ToastContainer />
    </div>
  );
}

export default Subscription;
