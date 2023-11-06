import MyTextInput from "../../components/Form/MyTextField";
import MySelectField from "../../components/Form/MySelectField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../../utils/toastify";
import { useSelector, useDispatch } from "react-redux";
import FeatureLoader from "../../components/FeatureLoader";
import { createUser, reset } from "../../features/users/usersSlice";
import { useEffect, useState } from "react";

// users: null,
// usersIsLoading: false,
// usersIsError: false,
// usersIsSuccess: false,
// usersErrorMessage: "",
// usersSuccessMessage: "",

function CreateProfile() {
  const dispatch = useDispatch();
  const {
    usersIsSuccess,
    usersIsLoading,
    usersIsError,
    usersErrorMessage,
    usersSuccessMessage,
  } = useSelector((state) => state.users);
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };
  const [formValues, setFormValues] = useState(initialData);
  useEffect(() => {
    if (usersIsError) {
      toast.error(usersErrorMessage, toastifyConfig);
    }
    if (usersSuccessMessage) {
      toast.success(usersSuccessMessage, toastifyConfig);
      setFormValues(initialData);
    }
    dispatch(reset());
  }, [
    usersIsError,
    usersErrorMessage,
    usersIsSuccess,
    usersSuccessMessage,
    dispatch,
  ]);
  console.log(usersIsError, usersErrorMessage);
  return (
    <div className="font-montserrat">
      <h2 className="font-bold text-2xl text-gray-700 text-center">
        Create a profile
      </h2>
      <div className="w-full md:w-[500px] mx-auto rounded-md shadow-lg p-4">
        <Formik
          initialValues={formValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Must be greater than 3 characters")
              .required("Required"),
            email: Yup.string().required("Required"),
            role: Yup.string().required("Select user role"),
            password: Yup.string()
              .min(6, "Password must be greater than 6 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              .min(6, "Must be greater than 6 characters")
              .required(),
          })}
          onSubmit={(values) => {
            dispatch(createUser(values));
            setFormValues(values);
          }}
        >
          <Form>
            <MyTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Enter  name"
            />
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter  email"
            />
            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter  password"
            />
            <MyTextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
            <MySelectField name="role" label="User role">
              <option value="">Select User role</option>
              <option value="user">User</option>
              <option value="juniorAdmin">Junior Admin</option>
              <option value="admin">Admin</option>
            </MySelectField>

            <div className="my-2">
              <button
                type="submit"
                className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
              >
                Register User
              </button>
              {usersIsLoading && <FeatureLoader text="Signing Up" />}
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CreateProfile;
