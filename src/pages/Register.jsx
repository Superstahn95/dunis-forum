import MyTextInput from "../components/Form/MyTextField";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { Form, Formik } from "formik";
import * as Yup from "Yup";
import { Link } from "react-router-dom";

function Register() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
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
                email: Yup.string().required("Required"),
                password: Yup.string().required("Required"),
              })}
              onSubmit={(values) => {
                dispatch(login(values));
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
                </div>
              </Form>
            </Formik>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Register;
