import { AxiosError } from "axios";
import { axiosInstance } from "../AxiosInstance";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';


// /auth/signup

export default function SignUp() {

    return (
        <>
            <Formik initialValues={{
                name: "", email: "", password: "",
                phoneNumber: "", gender: "", userRole: ""
            }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    try {
                        await axiosInstance.post("/signup", {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            phoneNumber: data.phoneNumber,
                            gender: data.gender,
                            userRole: data.userRole
                        })
                        alert("회원가입이 완료되었습니다.")
                    } catch (e) {

                        if (e instanceof AxiosError) {
                            alert(e.response?.data?.errorMessage ?? "회원가입에 실패하였습니다.");
                        }
                    } finally {
                        setSubmitting(false);
                        resetForm();
                    }
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().max(15).required(),
                    email: Yup.string()
                        .email("유효하지 않은 이메일 형식입니다.").required(),
                    password: Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                        .required(),
                    phoneNumber: Yup.string().matches(/^010-\d{4}-\d{4}$/, "010-1234-567 형식으로 입력해주세요.")
                })}
            >

                <Form className="signup-form">
                    <Field className="input-field" name="name" type="text" placeholder="name:" />
                    <Field className="input-field" name="email" type="email" placeholder="email:" />
                    <Field className="input-field" name="password" type="text" placeholder="password:" />
                    <Field className="input-field" name="phoneNumber" type="text" placeholder="phoneNumber:" />
                    <Field className="input-field" name="gender" type="text" placeholder="gender" />
                    <Field className="input-field" name="userRole" type="text" placeholder="userRole" />

                    <button id = "signup" type="submit">회원가입</button>

                </Form>

            </Formik>

        </>
    )
}
