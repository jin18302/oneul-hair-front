import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import type { requestType } from "./MenuRegister";
import type { Dispatch, SetStateAction } from "react";
import "../../styles/Menu.css";

export default function MenuRegisterModal({ selectCategory, setRequest, setIsShowModal }
    : { selectCategory: string, setRequest: Dispatch<SetStateAction<requestType[]>>, setIsShowModal: (b: boolean) => void }
) {

    return (
        <div className="menu-register-container">
            <Formik initialValues={{ name: "", price: "", introduction: "" }}
             
             onSubmit={async (data, { setSubmitting, resetForm }) => {

                    setSubmitting(true);

                    const request = {
                        category: selectCategory,
                        name: data.name,
                        price: Number(data.price),
                        introduction: data.introduction 
                    };

                    setRequest(prev => [...prev, request]);
                    setIsShowModal(false);
                    resetForm();
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().required(),
                    price: Yup.string().required(),
                    introduction: Yup.string().required()

                })}
            >
                <Form className="form">
                    <Field className="input-field" name="name" type="name" placeholder="name:" />
                    <ErrorMessage name="name" component="" />


                    <Field className="input-field" name="price" type="text" placeholder="price:" />
                    <ErrorMessage name="price" component="" />

                    <Field className="input-field" name="introduction" type="text" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="" />

                    <button type="submit"> 완료 </button>
                </Form>
            </Formik>
        </div>)
}