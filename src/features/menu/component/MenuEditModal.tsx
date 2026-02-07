import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
// import "../../styles/Menu.css";
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
        </>)
}