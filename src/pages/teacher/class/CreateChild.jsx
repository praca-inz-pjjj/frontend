import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../../components/navigation/Navigation";
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import Body from "../../../components/Body";
import { toast } from "react-toastify";
import FormBox from "components/layout/form/FormBox";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Imię jest wymagane'),
  second_name: Yup.string().required('Nazwisko jest wymagane'),
  birth_date: Yup.date()
  .required('Data urodzenia jest wymagana')
  .test("Data jest w przeszłości",
    "Data urodzenia musi być w przeszłości",
    (value) => value && new Date(value) < new Date())
});

export const CreateChild = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    
    let {id} = useParams();
    const submit = async (values, { setStatus }) => {
      const newChild = {
        first_name: values.first_name,
        last_name: values.second_name,
        birth_date: values.birth_date,
        classroom: id
      };
      try {
        setLoading(true)
        const { data } = await 
          axios.post(`/teacher/class/${id}/child`, newChild);

        if (!data) {
          setStatus('Nie udało się dodać dziecka.');
          return;
        }

        toast.success('Dziecko zostało dodane.');
        navigate(`/teacher/class/${id}`);
      } catch (error) {
        if (error?.response?.status === 400){
          setStatus('Nie udało się dodać dziecka.');
          return;
        }
        setStatus('Wystąpił Błąd. Spróbuj ponownie.');
        return;
      } finally {
        setLoading(false)
      }
  }

  return (
    <Body>
      <Navigation />
        <FormBox title="Nowe dziecko" cancelButton>
        <Formik
          initialValues={{
            first_name: '',
            second_name: '',
            birth_date: ''
          }}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          {({ values, status, handleChange, handleBlur, handleSubmit }) => (
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Imię</label>
                <input
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                />
                <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm" />
                
                <label htmlFor="second_name" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Nazwisko</label>
                <input
                  value={values.second_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="second_name"
                  id="second_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                />
                <ErrorMessage name="second_name" component="div" className="text-red-600 text-sm" />
                
                <label htmlFor="birth_date" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Data urodzenia</label>
                <input
                  value={values.birth_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                  name="birth_date"
                  id="birth_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                />
                <ErrorMessage name="birth_date" component="div" className="text-red-600 text-sm" />
              </div>

              {!!status && <div className="text-red-600">{status}</div>}

              {isLoading ? <LoadingSpinner /> : 
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
                >
                  Dodaj
                </button>
              }
            </form>
          )}
        </Formik>
      </FormBox>
    </Body>
  );
}
