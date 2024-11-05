import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../components/Navigation";
import { BACKEND_ADDRESS } from '../../constances';
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { generatePassword } from "../../helpers/generatePassword";

// Walidacja pól za pomocą Yup
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Imię jest wymagane'),
  second_name: Yup.string().required('Nazwisko jest wymagane'),
  email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  phone: Yup.string()
    .matches(/^[0-9]{9}$/, 'Numer telefonu musi mieć 9 cyfr')
    .required('Numer telefonu jest wymagany'),
});

export const CreateParent = () => {
  const [isLoading, setLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState(null); // Przechowywanie informacji o stworzonym użytkowniku

  const submit = async (values, { setStatus }) => {
    const generatedPassword = generatePassword(); // Generujemy hasło automatycznie

    const newParent = {
      first_name: values.first_name,
      second_name: values.second_name,
      email: values.email,
      phone: values.phone,
      password: generatedPassword, // Hasło jest generowane automatycznie
    };

    try {
      setLoading(true);
      // Utworzenie nowego rodzica
      const { data } = await axios.post(`${BACKEND_ADDRESS}/teacher/create-parent`, newParent);

      if (!data) {
        setStatus('Nie udało się dodać rodzica.');
        return;
      }

      // Zapisz dane użytkownika i wygenerowane hasło do stanu, aby wyświetlić później
      setCreatedUser(newParent);

      // Wyświetlenie informacji o użytkowniku zamiast przekierowania
    } catch (error) {
      if (error?.response?.status === 400){
        setStatus('Nie udało się dodać rodzica.');
        return;
      }
      setStatus('Wystąpił Błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navigation />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mt-[-100px]">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Dodaj rodzica
            </h1>
            {createdUser ? (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rodzic został pomyślnie dodany!</h2>
                <p className="text-gray-900 dark:text-gray-300"><strong>Imię:</strong> {createdUser.first_name}</p>
                <p className="text-gray-900 dark:text-gray-300"><strong>Nazwisko:</strong> {createdUser.second_name}</p>
                <p className="text-gray-900 dark:text-gray-300"><strong>Email:</strong> {createdUser.email}</p>
                <p className="text-gray-900 dark:text-gray-300"><strong>Telefon:</strong> {createdUser.phone}</p>
                <p className="text-gray-900 dark:text-gray-300"><strong>Wygenerowane hasło:</strong> {createdUser.password}</p>
              </div>
            ) : (
              <Formik
                initialValues={{
                  first_name: '',
                  second_name: '',
                  email: '',
                  phone: '',
                }}
                validationSchema={validationSchema}
                onSubmit={submit}
              >
                {({ values, status, handleChange, handleBlur, handleSubmit }) => (
                  <form className="space-y-4 md:space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <div>
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię</label>
                      <input value={values.first_name} onChange={handleChange} onBlur={handleBlur} type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" />
                      <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm" />

                      <label htmlFor="second_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwisko</label>
                      <input value={values.second_name} onChange={handleChange} onBlur={handleBlur} type="text" name="second_name" id="second_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" />
                      <ErrorMessage name="second_name" component="div" className="text-red-600 text-sm" />

                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" />
                      <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />

                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon</label>
                      <input value={values.phone} onChange={handleChange} onBlur={handleBlur} type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" />
                      <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
                    </div>

                    {!!status && <div className="text-red-600">{status}</div>}
                    {isLoading ? <LoadingSpinner /> :
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Dodaj rodzica</button>
                    }
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}