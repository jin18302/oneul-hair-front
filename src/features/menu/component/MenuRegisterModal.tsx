import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import * as Yup from 'yup';
import InputField from "../../../common/commponent/InputField";
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
                    <InputField name="name" type="text" placeholder="name:" />
                    <InputField name="price" type="text" placeholder="₩" />
                    <InputField as="textarea" name="introduction" type="email" placeholder="introduction:" />

                    <button type="submit"> 완료 </button>
                </Form>
            </Formik>
        </div>)
}