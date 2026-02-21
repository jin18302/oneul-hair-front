import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import ImageUploader from "../../image/components/ImageUploader";
import "../../image/styles/image.css";
import { useUserSignUpQuery } from "../hook/useAuthQuery";
import { userSignupReqInit } from "../type/formData";
export default function UserSignUpForm({setRegisterType}:{setRegisterType:() => void}) {

    console.log("UserSignUp rendering");

    const navigate = useNavigate();
    const { mutateAsync: signUp } = useUserSignUpQuery();


    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={userSignupReqInit}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    await signUp(data);

                    alert("회원가입에 성공하였습니다.")
                    navigate("/sign-in");
                    setSubmitting(false);
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().max(15).required("이름은 필수 입력 요소입니다."),
                    email: Yup.string()
                        .email("유효하지 않은 이메일 형식입니다.").required("이메일은 필수 입력 요소입니다."),
                    password: Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                        .required("비밀번호는 필수 입력 요소입니다."),
                    phoneNumber: Yup.string().matches(/^010-\d{4}-\d{4}$/, "010-1234-567 형식으로 입력해주세요.")  //TODO 이넘처럼 빼기
                })}
            >

                <Form className="flex flex-col justify-center items-center w-full">
                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="email" type="email" placeholder="email:" />
                    <ErrorMessage name="email" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="password" type="password" placeholder="password:" />
                    <ErrorMessage name="password" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]"name="phoneNumber" type="tel" placeholder="phoneNumber:" />
                    <ErrorMessage name="phoneNumber" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="gender" type="text" placeholder="gender" />
                    <ErrorMessage name="gender" component="" />

                    <ImageUploader fieldName={"profileImage"} />

                    <button id="block border-box mb-[10px] w-[400px] h-[50px] bg-[#3DADFF]" type="submit">회원가입</button>
                    <button id="block border-box mb-[10px] w-[400px] h-[50px] bg-[#b4dbf7]" onClick={setRegisterType}>기업 회원가입</button>

                </Form>
            </Formik>

        </>
    )
}
