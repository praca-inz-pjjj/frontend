import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../components/navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Body from "../components/Body";
import { toast } from "react-toastify";
import FormBox from "components/layout/form/FormBox";

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email jest wymagany')
});

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const submit = async (values, { setStatus }) => {
    const emailData = {
      email: values.email
    };
    try {
      setLoading(true);
      // Wysyłanie adresu email na serwer
      await axios.post('/reset-password', emailData);
      // Przekierowanie do strony głównej
      toast.success('Link do resetowania hasła został wysłany na podany adres email.');
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Wystąpił błąd. Spróbuj ponownie.';
      setStatus(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Body>
      <Navigation />
      <FormBox title="Odzyskiwanie dostępu" cancelButton>
            <p className="text-sm">Na podany adres email zostanie wysłany link do zmiany hasła</p>
            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={validationSchema}
              onSubmit={submit}
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
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                  </div>
                  {!!status && <div className="text-red-600">{status}</div>}
                  {isLoading ? <LoadingSpinner /> : 
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                    >
                      Wyślij
                    </button>
                  }
                </form>
              )}
            </Formik>
        </FormBox>
    </Body>
  );
}
