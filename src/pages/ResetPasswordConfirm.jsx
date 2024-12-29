import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../components/navigation/Navigation";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Body from "../components/Body";
import { toast } from "react-toastify";
import FormBox from "components/layout/form/FormBox";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .required('Nowe hasło jest wymagane'),
});

export const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handlePasswordResetConfirm = async (values, { setStatus }) => {
    try {
      setLoading(true);
      await axios.post(`/password-reset-confirm/${uid}/${token}/`, {
        new_password: values.newPassword,
      });
      toast.success('Hasło zostało zmienione.');
      navigate('/');
    } catch (error) {
      if (error?.response?.status === 400) {
        setStatus('Nie udało się zresetować hasła.');
        return;
      }
      setStatus('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <Navigation />
        <FormBox title="Zresetuj hasło">
          <p className="text-sm">Wprowadź nowe hasło, aby zakończyć proces resetowania</p>
          <Formik
            initialValues={{
              newPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handlePasswordResetConfirm}
          >
            {({ values, status, handleChange, handleBlur, handleSubmit }) => (
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div>
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
                    Nowe hasło
                  </label>
                  <input
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-red-600 text-sm" />
                </div>
                {!!status && <div className="text-red-600">{status}</div>}
                {isLoading ? <LoadingSpinner /> : 
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                  >
                    Zmień hasło
                  </button>
                }
              </form>
            )}
          </Formik>
        </FormBox>
    </Body>
  );
};
