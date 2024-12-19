import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigation } from "../../../components/Navigation";
import Body from "../../../components/Body";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import FormBox from "components/layout/FormBox";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    child_id: Yup.string().required("Wybór dziecka jest wymagany"),
    receiver_id: Yup.string().required("Wybór odbierającego jest wymagany"),
});

const errorClass = "text-red-600 text-sm";
const buttonClass = "w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center";

export const AddPermision = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [childrenList, setChildrenList] = useState([]);
    const [receiversList, setReceiversList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const childrenResponse = await axios.get("/parent/children");
                if (childrenResponse.status === 200) {
                    setChildrenList(childrenResponse.data);
                }

                const receiversResponse = await axios.get("/parent/receiver/permission");
                if (receiversResponse.status === 200) {
                    setReceiversList(receiversResponse.data);
                }
            } catch (error) {
                toast.error("Błąd połączenia z serwerem.");
            }
        };

        fetchData();
    }, []);

    const submit = async (values, { setStatus }) => {
        try {
            setLoading(true);
            const response = await axios.post("/parent/receiver/permission", {child_id: values.child_id, receiver_id: values.receiver_id})
            if (response?.status === 200) {
                toast.success("Upoważnienie zostało dodane pomyślnie");
                navigate('/parent');
                return;
            }
        } catch (error) {
            if (error.code === 'ERR_BAD_REQUEST'){
                toast.error("Ten użytkownik już posiada upoważnienie do tego dziecka")
            }
            setStatus("Wystąpił błąd. Spróbuj ponownie.");
        } finally {
            setLoading(false);
        }
    };

    const formatOptions = (list) => list.map((item) => ({
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
    }));

    const findChild = (childrenList, values) => {
        return childrenList.find(child => child.id === values.child_id) ? { value: values.child_id, label: `${childrenList.find(child => child.id === values.child_id).first_name} ${childrenList.find(child => child.id === values.child_id).last_name}` } : null
    }

    const findReceiver = (receiversList, values) => {
        return receiversList.find(receiver => receiver.id === values.receiver_id) ? { value: values.receiver_id, label: `${receiversList.find(receiver => receiver.id === values.receiver_id).first_name} ${receiversList.find(receiver => receiver.id === values.receiver_id).last_name}` } : null
    }

    return (
        <Body>
            <Navigation />
            <FormBox>
                <h1 className="text-xl font-bold text-gray-900 mb-4">Nadaj upoważnienie użytkownikowi do odbiorów twojego dziecka</h1>
                <Formik
                    initialValues={{
                        child_id: "",
                        receiver_id: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={submit}
                >
                    {({ values, status, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            <div>
                                <label htmlFor="child_id" className="block mb-2 text-sm font-medium text-gray-900">
                                    Wybierz dziecko
                                </label>
                                <Select
                                    id="child_id"
                                    name="child_id"
                                    value={findChild(childrenList, values)}
                                    onChange={(selectedOption) => {
                                        setFieldValue("child_id", selectedOption ? selectedOption.value : '');
                                    }}
                                    options={formatOptions(childrenList)}
                                    isSearchable
                                    placeholder="Wybierz dziecko"
                                />
                                <ErrorMessage name="child_id" component="div" className={errorClass} />
                            </div>

                            <div>
                                <label htmlFor="receiver_id" className="block mb-2 text-sm font-medium text-gray-900">
                                    Wybierz odbierającego
                                </label>
                                <Select
                                    id="receiver_id"
                                    name="receiver_id"
                                    value={findReceiver(receiversList, values)}
                                    onChange={(selectedOption) => {
                                        setFieldValue("receiver_id", selectedOption ? selectedOption.value : '');
                                    }}
                                    options={formatOptions(receiversList)}
                                    isSearchable
                                    placeholder="Wybierz odbierającego"
                                />
                                <ErrorMessage name="receiver_id" component="div" className={errorClass} />
                            </div>

                            {status && <div className={errorClass}>{status}</div>}
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <button type="submit" className={buttonClass}>
                                    Zatwierdź
                                </button>
                            )}
                        </form>
                    )}
                </Formik>
            </FormBox>
        </Body>
    );
};
