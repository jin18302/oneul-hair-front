import { Form, Formik } from "formik";
import * as Yup from 'yup';
import InputField from "../../../common/commponent/InputField";
import { useUpdateMenuQuery } from "../hook/useMenuQuery";
import type { MenuRes } from "../type/response";

export default function MenuEditModal({ menuRes, setEditMode }
    : { menuRes: MenuRes, setEditMode: (b: boolean) => void }) {

    const { mutateAsync: updateMenu } = useUpdateMenuQuery();


    return (
        <>
            <Formik initialValues={menuRes}
                onSubmit={async (data, { setSubmitting, resetForm }) => {

                    setSubmitting(true);

                    const request = {
                        category: menuRes.category,
                        name: data.name,
                        price: Number(data.price),
                        introduction: data.introduction
                    };

                    await updateMenu({ menuId: menuRes.id, body: request });
                    alert("수정이 완료되었습니다.");
                    setEditMode(false);

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
        </>)
}