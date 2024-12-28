import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import Body from "../components/Body";
import FormBox from "components/layout/form/FormBox";

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

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, []); // eslint-disable-line

  const submit = async (values, { setStatus }) => {
    const tempUserId = localStorage.getItem("temp_user_id");

    try {
        setLoading(true);
      const response = await axios.post('/change-password',
        { userId: tempUserId, password: values.new_password }
      );
      console.log(response);
      if (response.status !== 204){
        console.log('Nie udało się zmienić hasła');
        setStatus('Nie udało się zmienić hasła');
        return;
      }

      toast.success("Zmieniono pomyślnie hasło.");
      navigate("/login");
    } catch (error) {
      setStatus("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <Navigation />
        <FormBox title="Zmień hasło" cancelButton>
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
                      className="block mb-2 text-sm font-medium text-gray-900"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      className="block mb-2 text-sm font-medium text-gray-900"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Zmień hasło
                    </button>
                  )}
                </form>
              )}
            </Formik>
        </FormBox>
    </Body>
  );
};
