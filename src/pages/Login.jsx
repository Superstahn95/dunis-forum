import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Form, Formik } from "formik";
import MyTextInput from "../components/Form/MyTextField";
import * as Yup from "Yup";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import toastifyConfig from "../utils/toastify";
import { Bars } from "react-loader-spinner";
import FeatureLoader from "../components/FeatureLoader";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading, isError, message, isAuthenticated } =
    useSelector((state) => state.auth);
  const initialData = {
    email: "",
    password: "",
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
              Sign In
            </h2>
            <Formik
              initialValues={initialData}
              validationSchema={Yup.object({
                email: Yup.string().required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={(values) => {
                dispatch(login(values));
              }}
            >
              <Form>
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

                <p className="text-xs text-gray-700 font-montserrat">
                  Don't have an account?{" "}
                  <Link to={"/register"} className="text-orange-500">
                    Sign up
                  </Link>
                </p>
                <div className="my-2">
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
                  >
                    Sign In
                  </button>
                  {isLoading && <FeatureLoader text="Signing In" />}
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

export default Login;
