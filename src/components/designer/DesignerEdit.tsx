import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from 'yup';
import { designerDetailInit, type DesignerDetail } from "../../types/DesignerDetail";
import { axiosInstance } from "../../AxiosInstance";
import { isAxiosError } from "axios";

export default function DesignerEdit() {

    const { designerId } = useParams();
    const [designerDetail, setDesignerDetail] = useState<DesignerDetail>(designerDetailInit);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const nav = useNavigate();

    useEffect(() => {

        const apiHandler = async () => {
            const response = await axiosInstance.get<DesignerDetail>(`/auth/designers/${designerId}`);
            setDesignerDetail(response.data);
            setIsLoading(false);
            
        }

        apiHandler();

    }, []);

    if(isLoading){return <div>loading...</div>}


    return (
        <div className="form-container">
            <Formik initialValues={designerDetail}
                onSubmit={async (data, { setSubmitting, resetForm }) => {

                    setSubmitting(true);

                    try {

                        const token = localStorage.getItem("token");

                        const requestBody = {
                            name: data.name,
                            introduction: data.introduction,
                            profileImage: data.profileImage,
                            snsUriList: data.snsUrlList
                        }

                        await axiosInstance.patch<DesignerDetail>(`/designers/${designerId}`,
                            requestBody,
                            { headers: { 'Authorization': token } }
                        );

                        alert("정보 수정이 완료되었습니다.");
                        nav(`/designers/${designerId}`);

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

                    {/* <Field className="input-field" name="profileImage" type="file" />
                    <ErrorMessage name="profileImage" component="div" /> */}

                    <Field className="input-field" name="snsUriList" type="url" placeholder="sns uri list:" />
                    <ErrorMessage name="snsUriList" component="div" />

                    <button type="submit">저장</button>
                </Form>

            </Formik>
        </div>

    )
}