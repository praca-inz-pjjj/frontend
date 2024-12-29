import React, { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../components/navigation/Navigation";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { generatePassword } from "../../helpers/generatePassword";
import Body from "../../components/Body";
import ColorfulButton from "../../components/buttons/ColorfulButton";
import ColorfulLinkButton from "../../components/buttons/ColorfulLinkButton";
import CopyableTextBox from "../../components/CopyableTextBox";
import FormBox from "components/layout/form/FormBox";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Imię jest wymagane'),
  second_name: Yup.string().required('Nazwisko jest wymagane'),
  email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  phone: Yup.string()
    .matches(/^[0-9]{9}$/, 'Numer telefonu musi mieć 9 cyfr')
    .required('Numer telefonu jest wymagany'),
});

const resultClass = "text-gray-900 text-md flex flex-row space-x-2";
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5";
const errorClass = "text-red-600 text-sm";
const buttonClass = "w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

export const CreateParent = () => {
  const [isLoading, setLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const submit = async (values, { setStatus }) => {
    const generatedPassword = generatePassword();

    const newParent = {
      first_name: values.first_name,
      second_name: values.second_name,
      email: values.email,
      phone: values.phone,
      password: generatedPassword,
    };

    try {
      setLoading(true);
      const { data } = await axios.post(`/teacher/create-parent`, newParent);

      if (!data) {
        setStatus('Nie udało się dodać rodzica.');
        return;
      }

      setCreatedUser(newParent);

    } catch (error) {
      if (error?.response?.status === 400) {
        setStatus('Nie udało się utworzyć konta.');
        return;
      }
      setStatus('Wystąpił Błąd. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const ResultTextBox = ({ labelText, text, canCopy = false }) => (
    <div className={resultClass}>
        <p>{labelText}:</p>
        <strong>
            <CopyableTextBox text={text} canCopy={canCopy} />
        </strong>
    </div>
  );

  return (
    <Body>
      <Navigation />
        <FormBox title="Utwórz konto Rodzica" cancelButton>
          {createdUser ? (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Konto zostało utworzone pomyślnie!</h2>
              <div className="flex flex-col space-y-2 mb-8">
                <ResultTextBox labelText="Imię" text={createdUser.first_name} />
                <ResultTextBox labelText="Nazwisko" text={createdUser.second_name} />
                <ResultTextBox labelText="Email" text={createdUser.email} />
                <ResultTextBox labelText="Telefon" text={createdUser.phone} />
                <ResultTextBox labelText="Wygenerowane hasło" text={createdUser.password} canCopy={true} />
              </div>
              <div className="flex flex-row justify-between">
                <ColorfulLinkButton color="blue" to="/teacher" text="Powrót" />
                <ColorfulButton text="Utwórz kolejne" color="green" onClick={() => {
                    setCreatedUser(null);
                }} />
              </div>
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
                <form
                  className="space-y-4 md:space-y-6"
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
                      className={inputClass}
                    />
                    <ErrorMessage name="first_name" component="div" className={errorClass} />

                    <label htmlFor="second_name" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Nazwisko</label>
                    <input
                      value={values.second_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="second_name"
                      id="second_name"
                      className={inputClass}
                    />
                    <ErrorMessage name="second_name" component="div" className={errorClass} />

                    <label htmlFor="email" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      name="email"
                      id="email"
                      className={inputClass}
                    />
                    <ErrorMessage name="email" component="div" className={errorClass} />

                    <label htmlFor="phone" className="block mt-4 mb-2 text-sm font-medium text-gray-900">Telefon</label>
                    <input
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      name="phone"
                      id="phone"
                      className={inputClass}
                    />
                    <ErrorMessage name="phone" component="div" className={errorClass} />
                  </div>

                  {!!status && <div className="text-red-600">{status}</div>}
                  {isLoading ? <LoadingSpinner /> :
                    <button
                      type="submit"
                      className={buttonClass}
                    >
                      Utwórz
                    </button>
                  }
                </form>
              )}
            </Formik>
          )}
      </FormBox>
    </Body>
  );
};
