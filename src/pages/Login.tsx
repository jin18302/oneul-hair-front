import { axiosInstance } from "../AxiosInstance";
import { isAxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import "../styles/Form.css"


// /auth/login

export default function Login() {
    return (
        <>
            <Formik initialValues={{ email: "", password: "" }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {

                    console.log("submit start")
                    setSubmitting(true);

                    try {
                        const response = await axiosInstance.post("/login", {
                            email: data.email,
                            password: data.password
                        })

                        localStorage.setItem("token", response.data.accessToken);

                    } catch (e: unknown) {

                        if (isAxiosError(e)) {
                            alert(e.response?.data?.errorMessage ?? "로그인에 실패하였습니다.")
                        }

                    } finally {
                        setSubmitting(false);
                        resetForm();
                    }
                }}

                validationSchema={Yup.object().shape({
                     email: Yup.string()
                        .email("유효하지 않은 이메일 형식입니다.").required(),
                    password: Yup.string()
                         .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                         .required()
                })}
            >
                <Form className="login-form">
                        <Field className="input-field" name="email"  type="email" placeholder="email:"/>
                        <Field className="input-field" name="password" type="text" placeholder="password:" />
                    <button className="login-button" id="login" type="submit"> 로그인 </button>
                </Form>
            </Formik>


            <button className="login-button" id="kakao-login">카카오 로그인</button>
            <button className="login-button" id="naver-login">네이버 로그인</button>
        </>
    )

}