import Table from "../../components/Table";
import {
  reset,
  getAllUsers,
  authorizeUser,
  revokeUser,
  deleteUser,
} from "../../features/users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import FeatureLoader from "../../components/FeatureLoader";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../../utils/toastify";
function Users() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //   const [loadingRows, setLoadingRows] = useState({});
  const [loadingRows, setLoadingRows] = useState({
    revoke: {},
    delete: {},
    authorize: {},
  });
  const [dataFetched, setDataFetched] = useState(false);
  const {
    users,
    usersIsLoading,
    usersIsError,
    usersErrorMessage,
    usersSuccessMessage,
  } = useSelector((state) => state.users);
  const handleAuthorization = (id, action) => {
    const newLoadingRows = { ...loadingRows };
    newLoadingRows[action][id] = true;
    setLoadingRows(newLoadingRows);
    setLoading(true);

    if (action === "authorize") {
      dispatch(authorizeUser(id)).then(() => {
        setLoading(false);
        newLoadingRows[action][id] = false;
        setLoadingRows(newLoadingRows);
      });
    }
    if (action === "revoke") {
      dispatch(revokeUser(id)).then(() => {
        setLoading(false);
        newLoadingRows[action][id] = false;
        setLoadingRows(newLoadingRows);
      });
    }
  };

  const handleDelete = (id) => {
    const newLoadingRows = { ...loadingRows };
    newLoadingRows.delete[id] = true;
    setLoadingRows(newLoadingRows);
    setLoading(true);

    dispatch(deleteUser(id)).then(() => {
      setLoading(false);
      newLoadingRows.delete[id] = false;
      setLoadingRows(newLoadingRows);
    });
  };

  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    {
      name: "Status",
      cell: (row) =>
        row.authorized ? (
          <div className="bg-green-500 flex items-center justify-center text-white text-xs p-1 w-[100px] rounded-xl">
            Authorized
          </div>
        ) : (
          <div className="bg-yellow-500 text-white flex items-center justify-center w-[100px] text-xs p-1 rounded-xl">
            Pending
          </div>
        ),
    },
    {
      name: "SignUp Date",
      selector: (row) => dateFormat(row.createdAt, "longDate"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1">
          <div>
            {row.authorized ? (
              <button
                disabled={loading}
                onClick={() => handleAuthorization(row._id, "revoke")}
                className="bg-orange-500 w-20 text-xs rounded-md text-white px-2 py-2"
              >
                {loadingRows.revoke[row._id] ? "Revoking..." : "Revoke"}
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={() => handleAuthorization(row._id, "authorize")}
                className="bg-green-500 w-20 text-xs rounded-md text-white px-2 py-2"
              >
                {loadingRows.authorize[row._id]
                  ? "Authorizing..."
                  : "Authorize"}
              </button>
            )}
          </div>
          <button
            disabled={loading}
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 w-20 text-xs rounded-md text-white px-2 py-2"
          >
            {loadingRows.delete[row._id] ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (!dataFetched) {
      dispatch(getAllUsers());
      setDataFetched(true);
    }
    if (usersIsError) {
      toast.error(usersErrorMessage, toastifyConfig);
    }
    const resetTimeout = setTimeout(() => {
      dispatch(reset());
    }, 500);
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [usersIsError, dispatch, usersErrorMessage, dataFetched]);

  return (
    <div className="font-montserrat">
      <h2 className=" font-bold text-2xl">Manage Users</h2>
      {usersIsLoading ? (
        <FeatureLoader text="Fetching Users" />
      ) : users ? (
        <div className="grid col-1 bg-white shadow-sm  font-montserrat mt-8">
          <Table tableHeaders={columns} tableDetails={users} />
        </div>
      ) : (
        <div className="w-full p-4 bg-red-400 flex items-center jusify-center">
          <p>No users data available</p>
        </div>
      )}
      {/* <FeatureLoader /> */}
      <ToastContainer />
    </div>
  );
}

export default Users;
