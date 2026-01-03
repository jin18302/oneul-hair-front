import { AxiosError } from "axios";
import { axiosInstance } from "../../AxiosInstance";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router";

export default function SignUp() {

    console.log("SignUp rendering");

    const navigator = useNavigate();
    const shopRegisterPageHandler = () => {navigator('/shops');}

    return (
        <>
            <Formik initialValues={{
                name: "", email: "", password: "",
                phoneNumber: "", gender: "", 
            }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    try {
                        await axiosInstance.post("/auth/signup", {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            phoneNumber: data.phoneNumber,
                            gender: data.gender,
                            userRole: "CUSTOMER"
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
                    name: Yup.string().max(15).required("이름은 필수 입력 요소입니다."),
                    email: Yup.string()
                        .email("유효하지 않은 이메일 형식입니다.").required("이메일은 필수 입력 요소입니다."),
                    password: Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                        .required("비밀번호는 필수 입력 요소입니다."),
                    phoneNumber: Yup.string().matches(/^010-\d{4}-\d{4}$/, "010-1234-567 형식으로 입력해주세요.")
                })}
            >

                <Form className="form">
                    <Field className="input-field" name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component=""/>

                    <Field className="input-field" name="email" type="email" placeholder="email:" />
                    <ErrorMessage name="email" component=""/>

                    <Field className="input-field" name="password" type="password" placeholder="password:" />
                    <ErrorMessage name="password" component=""/>

                    <Field className="input-field" name="phoneNumber" type="tel" placeholder="phoneNumber:" />
                    <ErrorMessage name="phoneNumber" component=""/>

                    <Field className="input-field" name="gender" type="text" placeholder="gender" />
                    <ErrorMessage name="gender" component=""/>

                    <button id = "signup-button" type="submit">회원가입</button>
                    <button id = "shop-register-button"onClick={shopRegisterPageHandler}>기업 회원가입</button>

                </Form>
            </Formik>

        </>
    )
}
