import { isAxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { axiosInstance } from "../../AxiosInstance";
import "../../styles/Form.css";
import type { UserRes } from "../../types/UserRes";
import { userInfoStore } from "../../contexts/userInfoStore";


// /auth/sign-in

export default function Login() {

    console.log("Login rendering");

    const setUserInfo = userInfoStore(r => r.setUserInfo);
    const navigator = useNavigate();

    return (


        <Formik initialValues={{ email: "", password: "" }}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                try {
                    const response = await axiosInstance.post("/auth/login", {
                        email: data.email,
                        password: data.password
                    });

                    localStorage.setItem("token", response.data.accessToken);
                    
                    const readRespose = await axiosInstance.get<UserRes>("/users",{ headers: { 'Authorization': response.data.accessToken }})
                    setUserInfo(readRespose.data);
                    navigator('/'); //TODO

                } catch (e: unknown) {

                    if (isAxiosError(e)) {
                        alert(e.response?.data?.errorMessage ?? "로그인에 실패하였습니다.");
                        return;
                    }
                } finally {
                    setSubmitting(false);
                    resetForm();
                }
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email("유효하지 않은 이메일 형식입니다.").required("이메일은 필수입력 요소입니다."),
                password: Yup.string()
                    .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                    .required("비밀번호는 필수 입력요소입니다.")
            })}
        >
            <Form className="form">
                <Field className="input-field" name="email" type="email" placeholder="email:" />
                <ErrorMessage name="password" component="" />


                <Field className="input-field" name="password" type="password" placeholder="password:" />
                <ErrorMessage name="email" component="" />

                <button id="login-button" type="submit"> 로그인 </button>
                {/* <button className="login-button" id="kakao-login">카카오 로그인</button>
            <button className="login-button" id="naver-login">네이버 로그인</button> */}
            </Form>
        </Formik>


    )

}