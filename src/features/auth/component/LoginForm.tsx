import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useLoginQuery } from "../hook/useAuthQuery";

export default function LoginForm() {

    console.log("Login rendering")

    const navigator = useNavigate();
    const { mutateAsync: login } = useLoginQuery();


    return (
        <Formik initialValues={{ email: "", password: "" }}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                await login(data);
                navigator('/');

                setSubmitting(false);
                resetForm();

            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email("유효하지 않은 이메일 형식입니다.").required("이메일은 필수입력 요소입니다."),
                password: Yup.string()
                    .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                    .required("비밀번호는 필수 입력요소입니다.")
            })}
        >
            {/* TODO: 필드, 폼 컴포넌트화 or 모둘 적용 고려*/}
            <Form className="flex flex-col justify-center items-center w-full">
                <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="email" type="email" placeholder="email:" />
                <ErrorMessage name="password" component="" />

                <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="password" type="password" placeholder="password:" />
                <ErrorMessage name="email" component="" />

                <button id="login-button" type="submit"> 로그인 </button>
                {/* <button className="login-button" id="kakao-login">카카오 로그인</button>
            <button className="login-button" id="naver-login">네이버 로그인</button> */}
            </Form>
        </Formik>
    )

}