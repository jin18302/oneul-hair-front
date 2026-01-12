import { isAxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { axiosInstance } from "../../AxiosInstance";
import type { DesignerDetail } from "../../types/DesignerDetail";

export default function DesignerRegister() {

    const navigator = useNavigate();

    return (
        <div className="form-container">
            <Formik initialValues={{
                name: "", introduction: "", profileImage: "", snsUriList: ""

            }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    try {

                        const token = localStorage.getItem("token");

                        const requestBody = {
                            name: data.name,
                            introduction: data.introduction,
                            profileImage: data.profileImage,
                            snsUriList: data.snsUriList.split(',')
                        }

                       const response = await axiosInstance.post<DesignerDetail>(`/shops/designers`,
                            requestBody,
                            { headers: { 'Authorization': token } }
                        );

                        navigator(`/designers/${response.data.id}/menus`);
                        resetForm();

                    } catch (e: unknown) {

                        if (isAxiosError(e)) {
                            alert(e.response?.data?.errorMessage ?? "잠시후 다시 시도해주세요.");
                            return;
                        }
                    } finally {
                        setSubmitting(false);
                    }
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().max(20).required(),
                    introduction: Yup.string().required(),
                    snsUriList: Yup.string()
                })}
            >
                <Form className="form">

                    <Field className="input-field" name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component="div" />

                    <Field as="textarea" className="input-field" name="introduction" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="div" />

                    <Field className="input-field" name="profileImage" type="file" />
                    <ErrorMessage name="profileImage" component="div" />

                    <Field className="input-field" name="snsUriList" type="url" placeholder="sns uri list:" />
                    <ErrorMessage name="snsUriList" component="div" />

                    <button type="submit">다음</button>
                </Form>
            </Formik>
        </div>
    )
}