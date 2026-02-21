import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router";
import * as Yup from 'yup';
import InputField from "../../../common/commponent/InputField";
import ImageEditor from "../../image/components/ImageEditor";
import { useGetDesignerInfo, useUpdateDesigner } from "../hook/useDesignerQuery";


export default function DesignerEdit() {

    const { designerId } = useParams() as { designerId: string };
    const navigate = useNavigate();
    const { data: designerDetail } = useGetDesignerInfo(designerId);
    const { mutateAsync } = useUpdateDesigner();

    return (
        <Formik initialValues={designerDetail}
            onSubmit={async (data, { setSubmitting, resetForm }) => {

                setSubmitting(true);

                const requestBody = {
                    name: data.name,
                    introduction: data.introduction,
                    profileImage: data.profileImage,
                    snsUriList: data.snsUrlList
                }

                await mutateAsync({ designerId: designerId, body: requestBody });
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
            <Form className="flex flex-col justify-center items-center w-full">

                <ImageEditor fieldName="profileImage" currentImage={designerDetail.profileImage} />
                <InputField name="name" type="text" placeholder="name:" />
                <InputField as="textarea" name="introduction" type="email" placeholder="introduction:" />
                <InputField name="snsUriList" type="text" placeholder="snsUriList:" />

                <button type="submit">저장</button>
            </Form>

        </Formik>

    )
}