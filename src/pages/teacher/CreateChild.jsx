import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../components/Navigation";
import {useNavigate, useParams} from 'react-router-dom';
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil-state/auth";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Imię jest wymagane'),
  second_name: Yup.string().required('Nazwisko jest wymagane'),
  birth_date: Yup.date().required('Data urodzenia jest wymagana')
});

export const CreateChild = () => {
    const navigate = useNavigate();
    const [ isLoading, setLoading ] = useState(false);
    const auth = useRecoilValue(authState)
    
    let {id} = useParams();
    const submit = async (values, { setStatus }) => {
      const newChild = {
        name: values.first_name,
        surname: values.second_name,
        birth_date: values.birth_date,
        classroom: id
      };

      if (auth.userType !== 'teacher') {
          navigate('/teacher/login');
          return;
      }
      try {
        setLoading(true)
        // Utworzenie nowego ucznia i przypisanie go do klasy
        const { data } = await 
          axios.post(`/teacher/class/${id}/create`, newChild);

        if (!data) {
          console.log('Nie udało się dodać dziecka');
          setStatus('Nie udało się dodać dziecka');
          return;
        }

        // Przekierowanie do strony głównej nauczyciela
       navigate(`/teacher/class/${id}`);
      } catch (error) {
        console.log(error);
        setStatus('Wystąpił Błąd. Spróbuj ponownie.');
        return;
      } finally {
        setLoading(false)
      }
  }

  return (
    <div>
      <Navigation />
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mt-[-100px]">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Dodaj dziecko
            </h1>
            <Formik
              initialValues={{
                first_name: '',
                second_name: '',
                birth_date: ''
              }}
              validationSchema={validationSchema}
              onSubmit={submit}
            >
              {({ values, status, handleChange, handleBlur, handleSubmit}) => (
                <form className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                >
                  <div>
                    <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imię</label>
                    <input value={values.first_name} onChange={handleChange} onBlur={handleBlur} type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm" />
                    <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nazwisko</label>
                    <input value={values.second_name} onChange={handleChange} onBlur={handleBlur} type="text" name="second_name" id="second_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <ErrorMessage name="second_name" component="div" className="text-red-600 text-sm" />
                    <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data urodzenia</label>
                    <input value={values.birth_date} onChange={handleChange} onBlur={handleBlur} type="date" name="birth_date" id="birth_date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <ErrorMessage name="birth_date" component="div" className="text-red-600 text-sm" />
                  </div>
                  {!!status && <div className="text-red-600">{status}</div>}
                  { isLoading ? <LoadingSpinner/> :
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Dodaj dziecko</button>
                  }
                </form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
}
