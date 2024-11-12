import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigation } from "../../../components/Navigation";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import Body from "../../../components/Body";

// Validation schema
const validationSchema = Yup.object().shape({
  permitted_user: Yup.string().required("Odbierający jest wymagany"),
  start_date: Yup.date()
    .required("Data początkowa jest wymagana")
    .min(new Date(), "Data początkowa nie może być w przeszłości"),
  end_date: Yup.date()
    .required("Data końcowa jest wymagana")
    .min(Yup.ref("start_date"), "Data końcowa nie może być wcześniejsza niż początkowa"),
  two_factor_verification: Yup.boolean(),
});

// CSS class constants
const containerClass = "w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700";
const headingClass = "text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white";
const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600";
const errorClass = "text-red-600 text-sm";
const buttonClass = "w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

export const CreatePermission = () => {
  const [permittedUsers, setPermittedUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/parent/child/${id}/permitted-users`);
        setPermittedUsers(data.permitted_users || []);
      } catch (error) {
        console.error("Error fetching permitted users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const submit = async (values, { setStatus }) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/parent/child/${id}/create-permission`, values);

      if (!data) {
        setStatus("Nie udało się dodać uprawnienia.");
        return;
      }

      navigate(`/parent/child/${id}`);
    } catch (error) {
      setStatus("Wystąpił Błąd. Spróbuj ponownie.");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <Navigation />
      <div className="mt-[82px]">
        <section className="flex-grow flex items-center justify-center overflow-y-auto">
          <div className={containerClass}>
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className={headingClass}>Wydaj zgodę</h1>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Formik
                initialValues={{
                    permitted_user: "",
                    start_date: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().slice(0, 16),
                    end_date: new Date(new Date().getTime() + 120 * 60 * 1000).toISOString().slice(0, 16),
                    two_factor_verification: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={submit}
                  >
                  {({ values, status, handleChange, handleBlur, handleSubmit }) => (
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <label htmlFor="permitted_user" className={labelClass}>Odbierający</label>
                        <select
                          value={values.permitted_user}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="permitted_user"
                          id="permitted_user"
                          className={inputClass}
                        >
                          <option value="">-- Wybierz odbierającego --</option>
                          {Object.entries(permittedUsers).map(([key, value]) => (
                            <option key={key} value={value.id}>{value.user}</option>
                          ))}
                        </select>
                        <ErrorMessage name="permitted_user" component="div" className={errorClass} />

                        <label htmlFor="start_date" className={labelClass}>Data początkowa</label>
                        <input
                          type="datetime-local"
                          name="start_date"
                          id="start_date"
                          value={values.start_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          />
                        <ErrorMessage name="start_date" component="div" className={errorClass} />

                        <label htmlFor="end_date" className={labelClass}>Data końcowa</label>
                        <input
                          type="datetime-local"
                          name="end_date"
                          id="end_date"
                          value={values.end_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          />
                        <ErrorMessage name="end_date" component="div" className={errorClass} />

                        <label htmlFor="two_factor_verification" className={labelClass}>Dwustopniowa weryfikacja</label>
                        <input
                          type="checkbox"
                          name="two_factor_verification"
                          id="two_factor_verification"
                          checked={values.two_factor_verification}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="h-5 w-5"
                          />
                        <ErrorMessage name="two_factor_verification" component="div" className={errorClass} />
                      </div>

                      {status && <div className={errorClass}>{status}</div>}

                      <button type="submit" className={buttonClass}>
                        Dodaj uprawnienie
                      </button>
                    </form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </section>
      </div>
    </Body>
  );
};
