import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router";
import * as Yup from 'yup';
import { useGetDesignerInfo, useUpdateDesigner } from "../hook/useDesignerQuery";


export default function DesignerEdit() {

    const { designerId } = useParams() as {designerId: string};
    const navigate = useNavigate();
    const { data: designerDetail} = useGetDesignerInfo(designerId);
    const { mutateAsync } = useUpdateDesigner();

    return (
        <div className="form-container">
            <Formik initialValues={designerDetail}
                onSubmit={async (data, { setSubmitting, resetForm }) => {

                    setSubmitting(true);

                    const requestBody = {
                        name: data.name,
                        introduction: data.introduction,
                        profileImage: data.profileImage,
                        snsUriList: data.snsUrlList
                    }

                    await mutateAsync({designerId:designerId, body: requestBody});
                    alert("정보 수정이 완료되었습니다.");
                    navigate(`/designers/${designerId}`);

                    resetForm();
                    setSubmitting(false);
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