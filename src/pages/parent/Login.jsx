import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigation } from "../../components/navigation/Navigation";
import { useNavigate, Link } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Body from "../../components/Body";
import { toast } from "react-toastify";
import FormBox from "components/layout/form/FormBox";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email jest wymagany")
    .email("Niepoprawny adres email"),
  password: Yup.string().required("Hasło jest wymagane"),
});

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  
  const storeTokens = (accessToken, refreshToken) => {
    localStorage.clear();
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const isParent = localStorage.getItem("userType") === "parent";
    if (accessToken && isParent) {
      navigate("/parent");
    }
  }, []); // eslint-disable-line

  const submit = async (values, { setStatus }) => {
    setLoading(true);
    const user = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await axios.post("/parent/token", user);
      const { data } = res;

      if (!data || !data.access || !data.refresh) {
        setStatus("Wystąpił Błąd. Spróbuj ponownie.");
        return;
      }

      storeTokens(data.access, data.refresh);
      localStorage.setItem("userType", "parent");
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

      if (data.temp_password) {
        localStorage.setItem("temp_user_id", data.user);
        navigate("/change-password");
        return;
      }
      
      navigate("/parent");
    } catch (error) {
      if (!error.response) {
        toast.error("Błąd połączenia z serwerem.");
        return;
      }
      const { data } = error?.response;
      if (data?.non_field_errors?.length > 0) {
        setStatus(`${data.non_field_errors[0]}.`);
        return;
      }
      if (error?.response?.status === 401) {
        setStatus("Niepoprawny adres email lub hasło.");
        return;
      }
      setStatus("Wystąpił Błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <Navigation />
          <FormBox title="Panel Rodzica">
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  {!!status && <div className="text-red-600">{status}</div>}
                  {isLoading ? (
                    <LoadingSpinner size={32} className="p-[4px]"/>
                  ) : (
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Zaloguj się
                    </button>
                  )}
                </form>
              )}
            </Formik>
            <div className="flex flex-row justify-center">
              <Link to="/reset-password" className="text-blue-600 hover:underline ml-[5px]">
              Nie pamiętasz hasła?
              </Link>
            </div>
          </FormBox>
    </Body>
  );
};
