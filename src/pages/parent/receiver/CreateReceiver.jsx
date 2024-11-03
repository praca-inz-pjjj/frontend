import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from "../../../components/Navigation";
import { BACKEND_ADDRESS } from '../../../constances';
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { generatePassword } from "../../../helpers/generatePassword";
import BlueLinkButton from "../../../components/buttons/BlueLinkButton";
import GreenLinkButton from "../../../components/buttons/GreenLinkButton";

// Validation schema for form fields using Yup
const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Imię jest wymagane'),
    second_name: Yup.string().required('Nazwisko jest wymagane'),
    email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
    phone: Yup.string()
        .matches(/^[0-9]{9}$/, 'Numer telefonu musi mieć dokładnie 9 cyfr')
        .required('Numer telefonu jest wymagany'),
    child_id: Yup.string().required('Wybór dziecka jest wymagany'),
});

// CSS class constants
const containerClass = "w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700";
const headingClass = "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white";
const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600";
const errorClass = "text-red-600 text-sm";
const buttonClass = "w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
const resultClass = "text-gray-900 dark:text-gray-300";

export const CreateReceiver = () => {
    const [isLoading, setLoading] = useState(false);
    const [created_user, setCreatedUser] = useState({first_name: "", second_name: "", email: "", phone: "", password: ""});
    const [user_creation_success, setUserCreationSuccess] = useState(false)
    const [childrenList, setChildrenList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/parent/children');
                if (response.status === 200) {
                    const { data: children_data } = response;
                    setChildrenList(children_data)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    const submit = async (values, { setStatus }) => {
        const generatedPassword = generatePassword();

        const newReceiver = {
            first_name: values.first_name,
            second_name: values.second_name,
            email: values.email,
            phone: values.phone,
            password: generatedPassword,
        };

        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_ADDRESS}/parent/child/${values.child_id}/create-receiver`, newReceiver);
            if (response?.status === 200) {
                setCreatedUser(newReceiver);
                setUserCreationSuccess(true);
                return;
            }
            setStatus('Nie udało się utworzyć konta.');
        } catch (error) {
            setStatus(error?.response?.data?.message || 'Wystąpił Błąd. Spróbuj ponownie.')
            return;
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <Navigation />
            <section className="flex-grow flex items-center justify-center overflow-y-auto">
                <div className={containerClass}>
                    <div className="p-6 space-y-4 sm:p-8">
                        {user_creation_success ? (
                        <>
                        <h1 className={headingClass}>Konto zostało utworzone!</h1>
                        <div className="flex flex-col space-y-2">
                            <p className={resultClass}><strong>Imię:</strong> {created_user?.first_name || ""}</p>
                            <p className={resultClass}><strong>Nazwisko:</strong> {created_user?.second_name || ""}</p>
                            <p className={resultClass}><strong>Email:</strong> {created_user?.email || ""}</p>
                            <p className={resultClass}><strong>Telefon:</strong> {created_user?.phone || ""}</p>
                            <p className={resultClass}><strong>Wygenerowane hasło:</strong> {created_user?.password || ""}</p>
                        </div>
                        <div className="pt-4 flex flex-row justify-between">
                            <BlueLinkButton to="/parent/create-receiver" text="Zapisz dane"/>
                            <GreenLinkButton to="/parent/receivers" text="Utwórz kolejne"/>
                        </div>
                        </>
                        ) : (
                        <>
                        <h1 className={headingClass}>Utwórz konto Odbierającego</h1>
                        <Formik
                            initialValues={{
                                first_name: '',
                                second_name: '',
                                email: '',
                                phone: '',
                                child_id: '',
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
                                <div className="space-y-2">
                                    <label htmlFor="first_name" className={labelClass}>Imię</label>
                                    <input value={values.first_name} onChange={handleChange} onBlur={handleBlur} type="text" name="first_name" id="first_name" className={inputClass} />
                                    <ErrorMessage name="first_name" component="div" className={errorClass} />

                                    <label htmlFor="second_name" className={labelClass}>Nazwisko</label>
                                    <input value={values.second_name} onChange={handleChange} onBlur={handleBlur} type="text" name="second_name" id="second_name" className={inputClass} />
                                    <ErrorMessage name="second_name" component="div" className={errorClass} />

                                    <label htmlFor="email" className={labelClass}>Email</label>
                                    <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" name="email" id="email" className={inputClass} />
                                    <ErrorMessage name="email" component="div" className={errorClass} />

                                    <label htmlFor="phone" className={labelClass}>Telefon</label>
                                    <input value={values.phone} onChange={handleChange} onBlur={handleBlur} type="text" name="phone" id="phone" className={inputClass} />
                                    <ErrorMessage name="phone" component="div" className={errorClass} />

                                    <label htmlFor="child_id" className={labelClass}>Odbierane Dziecko</label>
                                    <select
                                        value={values.child_id}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="child_id"
                                        id="child_id"
                                        className={inputClass}
                                    >
                                        <option key={""} value="">Wybierz</option>
                                        { childrenList?.length > 0 ? (
                                            childrenList.map(child => (
                                            <option key={child.id} value={child.id}>
                                                {child.name} {child.surname}
                                            </option>
                                        ))) : (
                                            <option disabled value="">
                                                Brak dostępnych dzieci
                                            </option>
                                        )}
                                    </select>
                                    <ErrorMessage name="child_id" component="div" className={errorClass} />
                                </div>

                                {!!status && <div className={errorClass}>{status}</div>}
                                {isLoading ? <LoadingSpinner /> :
                                    <button type="submit" className={buttonClass}>Utwórz</button>
                                }
                                </form>
                            )}
                        </Formik>
                        </>
                        )}
                    </div>
                </div>
            </section >
        </div >
    );
}