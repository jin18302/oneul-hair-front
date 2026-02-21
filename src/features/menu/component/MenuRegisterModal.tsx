import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import type { Dispatch, SetStateAction } from "react";
// import "../../styles/Menu.css";
import type { CreateMenuReq } from "../type/request";

export default function MenuRegisterModal({ selectCategory, setRequest, setIsShowModal }
    : { selectCategory: string, setRequest: Dispatch<SetStateAction<CreateMenuReq[]>>, setIsShowModal: (b: boolean) => void }
) {

    return (
        <div className="w-175 border border-black">
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
                <Form className="flex flex-col justify-center items-center w-full">
                    <Field  className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]"  name="name" type="name" placeholder="name:" />
                    <ErrorMessage name="name" component="" />


                    <Field  className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]"  name="price" type="text" placeholder="price:" />
                    <ErrorMessage name="price" component="" />

                    <Field  className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]"  name="introduction" type="text" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="" />

                    <button type="submit"> 완료 </button>
                </Form>
            </Formik>
        </div>)
}