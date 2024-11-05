import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigation } from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { BACKEND_ADDRESS } from "../../constances";

const validationSchema = Yup.object().shape({
  new_password: Yup.string()
    .required("Hasło jest wymagane")
    .min(8, "Hasło musi mieć co najmniej 8 znaków"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Hasła muszą się zgadzać")
    .required("Potwierdzenie hasła jest wymagane"),
});

export const ChangePassword = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (values, { setStatus }) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/teacher/login');
      return;
    }
    const tempUserId = localStorage.getItem("temp_user_id");

    try {
        setLoading(true);
      const response = await axios.post(
        BACKEND_ADDRESS + `/parent/change-password`,
        { userId: tempUserId, password: values.new_password },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      if (response.status !== 204){
        console.log('Nie udało się zmienić hasła');
        setStatus('Nie udało się zmienić hasła');
        return;
      }

      alert("Hasło zostało zmienione. Możesz się teraz zalogować.");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      setStatus("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigation />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mt-[-100px]">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Zmień hasło
            </h1>
            <Formik
              initialValues={{
                new_password: "",
                confirm_password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({
                values,
                status,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div>
                    <label
                      htmlFor="new_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nowe hasło
                    </label>
                    <input
                      value={values.new_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      name="new_password"
                      id="new_password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="new_password"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Potwierdź hasło
                    </label>
                    <input
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="confirm_password"
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
                      Zmień hasło
                    </button>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};
