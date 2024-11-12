import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Body from "../../components/Body";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Nazwa klasy jest wymagana')
});

export const CreateClass = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const submit = async (values, { setStatus }) => {
    const newClass = {
      name: values.className,
      user_id: localStorage.getItem('user_id') // Zakładamy, że user_id jest przechowywany w localStorage
    };
    try {
      setLoading(true)
      // Utworzenie nowej klasy i przypisanie jej do zalogowanego nauczyciela
      const { data } = await axios.post('/teacher/class/create', newClass);

      if (!data) {
        console.log('Nie udało się stworzyć klasy');
        setStatus('Nie udało się stworzyć klasy');
        return;
      }

      // Przekierowanie do strony głównej nauczyciela
      navigate('/teacher');
    } catch (error) {
      if (error?.response?.status === 400) {
        setStatus('Nie udało się stworzyć klasy.');
        return;
      }
      setStatus('Wystąpił Błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false)
    }
  }

  return (
    <Body>
      <Navigation />
      <div className="mt-[200px]">
        <section className="flex justify-center">
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow mt-6 p-10 space-y-4">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Utwórz nową klasę</h1>
            <Formik
              initialValues={{
                className: ''
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
                    <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900">Nazwa klasy</label>
                    <input
                      value={values.className}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="className"
                      id="className"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                    />
                    <ErrorMessage name="className" component="div" className="text-red-600 text-sm" />
                  </div>
                  {!!status && <div className="text-red-600">{status}</div>}
                  {isLoading ? <LoadingSpinner /> : 
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                    >
                      Utwórz klasę
                    </button>
                  }
                </form>
              )}
            </Formik>
          </div>
        </section>
      </div>
    </Body>
  );
}
