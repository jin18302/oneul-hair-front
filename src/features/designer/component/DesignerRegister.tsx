import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import InputField from "../../../common/commponent/InputField";
import ImageUploader from "../../image/components/ImageUploader";
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

                <ImageUploader fieldName="profileImage" />
                <InputField name="name" type="text" placeholder="name:" />
                <InputField as="textarea" name="introduction" type="email" placeholder="introduction:" />
                <InputField name="snsUriList" type="text" placeholder="snsUriList:" />

                <button type="submit">다음</button>
            </Form>
        </Formik>
    )
}