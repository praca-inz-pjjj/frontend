import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigation } from "../../components/Navigation";
import { BACKEND_ADDRESS } from "../../constances";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil-state/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email jest wymagany")
    .email("Niepoprawny adres email"),
  password: Yup.string().required("Hasło jest wymagane"),
});

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (auth.userType === "parent") {
      navigate("/parent");
    }
  });

  const submit = async (values, { setStatus }) => {
    setLoading(true);
    const user = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await axios.post(
        BACKEND_ADDRESS + "/parent/token",
        user,
        {
          headers: { "Content-Type": "application/json" },
        },
        { withCredentials: true }
      );

      if (res.name === "AxiosError") {
        const { data } = res.response;
        if (data?.non_field_errors?.length > 0) {
          setStatus(data.non_field_errors);
          return;
        }
      }
      const { data } = res;
      if (!data) {
        console.log("Niepoprawny login lub hasło");
        setStatus("Niepoprawny login lub hasło");
        return;
      }
      // Initialize the access & refresh token in localstorage.
      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("userType", "parent");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;
      console.log(`Bearer ${data["access"]}`);
      setAuth({ userType: "parent" });
      navigate("/parent");
    } catch (error) {
      console.log(error);
      setStatus("Wystąpił Błąd. Spróbuj ponownie.");
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navigation />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Logowanie
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  status,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setStatus,
                }) => (
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit(values, { setStatus });
                    }}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hasło
                      </label>
                      <input
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    {!!status && <div className="text-red-600">{status}</div>}
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <button
                        type="submit"
                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Zaloguj się
                      </button>
                    )}
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
