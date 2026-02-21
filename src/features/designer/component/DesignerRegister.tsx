import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useCreateDesigner } from "../hook/useDesignerQuery";

export default function DesignerRegister() {

    const navigate = useNavigate();
    const { mutateAsync: createDesigner } = useCreateDesigner();

    return (
            <Formik initialValues={{
                name: "", introduction: "", profileImage: "", snsUriList: ""

            }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                        const requestBody = {
                            name: data.name,
                            introduction: data.introduction,
                            profileImage: data.profileImage,
                            snsUriList: data.snsUriList.split(',')
                        }

                        const response = await createDesigner(requestBody);

                        navigate(`/designers/${response.id}/menus`);
                        resetForm();
                        setSubmitting(false);
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().max(20).required(),
                    introduction: Yup.string().required(),
                    snsUriList: Yup.string()
                })}
            >
                <Form className="flex flex-col justify-center items-center w-full">

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component="div" />

                    <Field as="textarea" className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="introduction" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="div" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="profileImage" type="file" />
                    <ErrorMessage name="profileImage" component="div" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="snsUriList" type="url" placeholder="sns uri list:" />
                    <ErrorMessage name="snsUriList" component="div" />

                    <button type="submit">다음</button>
                </Form>
            </Formik>
    )
}