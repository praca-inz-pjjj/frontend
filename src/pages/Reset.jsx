import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

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
      const { data } = await axios.post('/reset-password', emailData);

      if (!data) {
        console.log('Nie udało się wysłać emaila');
        setStatus('Nie udało się wysłać emaila');
        return;
      }

      // Przekierowanie do strony głównej
      navigate('/');
    } catch (error) {
      if (error?.response?.status === 400) {
        setStatus('Nie udało się wysłać emaila.');
        return;
      }
      setStatus('Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="bg-gradient-to-b from-sky-50 to-sky-100 min-h-screen flex flex-col">
      <div className="mt-[200px]">
        <section className="flex justify-center">
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow mt-6 p-10 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Zapomniałem hasła</h1>
            <p className="text-sm">Na twój mail zostanie wysłany link do zmiany hasła</p>
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
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
