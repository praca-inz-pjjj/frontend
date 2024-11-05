import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../../components/Navigation";
import {useNavigate, useParams} from 'react-router-dom';
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil-state/auth";

// TODO add formik in task frontend-5
export const CreatePermission = () => {
    const [permittedUsers, setPermittedUsers] = useState(null);
    const navigate = useNavigate();
    const [ isLoading, setLoading ] = useState(true);
    const auth = useRecoilValue(authState);

    let {id} = useParams();

    useEffect(() => {
        if (auth.userType !== 'parent') {
            navigate('/parent/login');
            return;
        }
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await axios.get(`/parent/child/${id}/permitted-users`);
          setPermittedUsers(response.data.permitted_users);
        } catch (error) {
          return;
        } finally {
          setLoading(false)
        }
      };
  
      fetchData();
    }, [id, navigate, auth.userType]);

    const now = new Date();

    const validationSchema = Yup.object().shape({
      permitted_user: Yup.string()
      .required('Odbierający jest wymagany'),
      start_date: Yup.date()
      .required('Data początkowa jest wymagana')
      .min(new Date(now.getTime() - 5 * 60 * 1000), 'Data początkowa nie może być w przeszłości'),
      end_date: Yup.date()
      .required('Data końcowa jest wymagana')
      .min(Yup.ref('start_date'), 'Data końcowa nie może być w przeszłości'),  
      two_factor_verification: Yup.boolean(),
    });

    const submit = async (values, { setStatus }) => {
      const newPermission = {
        permitted_user: values.permitted_user,
        start_date: values.start_date,
        end_date: values.end_date,
        two_factor_verification: values.two_factor_verification
      };

      if (auth.userType !== 'parent') {
          navigate('/parent/login');
          return;
      }
      try {
        setLoading(true)
        // Utworzenie nowego uprawnienia
        const { data } = await 
          axios.post(`/parent/child/${id}/create-permission`, newPermission);

        if (!data) {
          console.log('Nie udało się dodać dziecka');
          setStatus('Nie udało się dodać dziecka');
          return;
        }

        // Przekierowanie do strony dziecka
       navigate(`/parent/child/${id}`);
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
                Dodaj uprawnienie
              </h1>
              { isLoading ? <LoadingSpinner/> :
              <Formik
                initialValues={{
                  permitted_user: '',
                  start_date: new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16),
                  end_date: new Date(now.getTime() + 120 * 60 * 1000).toISOString().slice(0, 16),
                  two_factor_verification: false
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
                      <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Odbierający</label>
                      <select value={values.permitted_user} onChange={handleChange} onBlur={handleBlur} name="permitted_user" id="permitted_user" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">-- Wybierz odbierającego --</option>
                      {Object.entries(permittedUsers).map(([key, value]) => (
                        <option key={key} value={value.id}> {value.user} </option>
                      ))}
                      </select>
                      <ErrorMessage name="permitted_user" component="div" className="text-red-600 text-sm" />
                      <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data początkowa</label>
                      <input value={values.start_date} onChange={handleChange} onBlur={handleBlur} type="datetime-local" name="second_name" id="second_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      <ErrorMessage name="start_date" component="div" className="text-red-600 text-sm" />
                      <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data końcowa</label>
                      <input value={values.end_date} onChange={handleChange} onBlur={handleBlur} type="datetime-local" name="birth_date" id="birth_date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      <ErrorMessage name="end_date" component="div" className="text-red-600 text-sm" />
                      <label htmlFor="className" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dwustopniowa weryfikacja</label>
                      <input value={values.two_factor_verification} onChange={handleChange} onBlur={handleBlur} type="checkbox" name="birth_date" id="birth_date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      <ErrorMessage name="two_factor_verification" component="div" className="text-red-600 text-sm" />
                    </div>
                    {!!status && <div className="text-red-600">{status}</div>}
                    { isLoading ? <LoadingSpinner/> :
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Dodaj uprawnienie</button>
                    }
                  </form>
                )}
              </Formik>
            }
            </div>
          </div>
        </section>
      </div>
    );
}