import { useEffect } from "react";
import MyTextInput from "../components/Form/MyTextField";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import toastifyConfig from "../utils/toastify";

import FeatureLoader from "../components/FeatureLoader";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading, isError, message, isAuthenticated } =
    useSelector((state) => state.auth);
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    if (isError) {
      toast.error(message, toastifyConfig);
    }
    if (isSuccess || user) {
      navigate("/", { replace: true });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);
  return (
    <>
      <Navbar />
      <Container>
        <section className="min-h-[70vh] flex items-center justify-center">
          <div className="w-full md:w-[500px] mx-auto rounded-md shadow-lg p-4">
            <h2 className="font-montserrat  text-3xl font-bold py-3 text-center">
              Sign Up
            </h2>
            <Formik
              initialValues={initialData}
              validationSchema={Yup.object({
                name: Yup.string()
                  .min(3, "Must be greater than 3 characters")
                  .required("Required"),
                email: Yup.string().required("Required"),
                password: Yup.string()
                  .min(6, "Password must be greater than 6 characters")
                  .required("Required"),
                confirmPassword: Yup.string()
                  .min(6, "Must be greater than 6 characters")
                  .required(),
              })}
              onSubmit={(values) => {
                dispatch(register(values));
              }}
            >
              <Form>
                <MyTextInput
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
                <MyTextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
                <MyTextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <MyTextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                />

                <p className="text-xs text-gray-700 font-montserrat">
                  Already have an account?{" "}
                  <Link to={"/login"} className="text-orange-500">
                    Sign in
                  </Link>
                </p>
                <div className="my-2">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
                  >
                    Sign In
                  </button>
                  {isLoading && <FeatureLoader text="Signing Up" />}
                </div>
              </Form>
            </Formik>
          </div>
          <ToastContainer />
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Register;
