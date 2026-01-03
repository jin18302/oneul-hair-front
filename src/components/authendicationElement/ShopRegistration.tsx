import { isAxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { axiosInstance } from "../../AxiosInstance";
import type { ShopDetailRes } from "../../types/ShopDetailRes";

export default function ShopRegistration({ setRegisterType }: { setRegisterType: (t: string) => void }) {

    console.log("ShopRegistration rendering");

    const pageHandler = () => setRegisterType("USER")

    return (
        <>
            <Formik initialValues={{
                name: "", businessId: "", email: "", password: "", address: "", phoneNumber: "",
                openTime: "", endTime: "", introduction: "", imageUrlList: "", snsUriList: "", shopTagIdSet: ""
            }}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    try {
                        await axiosInstance.post<ShopDetailRes>("/auth/shops", {
                            name: data.name,
                            businessId: data.businessId,
                            address: data.address,
                            phoneNumber: data.phoneNumber,
                            openTime: data.openTime,
                            endTime: data.endTime,
                            introduction: data.introduction,
                            imageUrlList: [],
                            snsUriList: data.snsUriList == "" ? [] : data.snsUriList.split(","),
                            shopTagIdSet: [],
                            ownerSignUpRequest: {
                                name: data.name,
                                email: data.email,
                                password: data.password,
                                phoneNumber: data.phoneNumber,
                                gender: null,
                                userRole: "OWNER"
                            }
                        });

                        alert("등록이 완료되었습니다.");

                    } catch (e: unknown) {

                        if (isAxiosError(e)) {
                            alert(e.response?.data?.errorMessage ?? "등록 중 문제가 발생했습니다. 잠시후 다시 시도해주세요.");
                            return;
                        }
                    } finally {
                        setSubmitting(false);
                        // resetForm();
                    }
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().max(15, "shop name은 최대 15글자까지 가능합니다").required(),
                    businessId: Yup.string().required(),
                    email: Yup.string()
                        .email("유효하지 않은 이메일 형식입니다.").required("이메일은 필수 입력 요소입니다."),
                    password: Yup.string()
                        .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/, "비밀번호는 소문자, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.")
                        .required("비밀번호는 필수 입력 요소입니다."),
                    address: Yup.string().required(),//TODO 주소 api 호출 
                    phoneNumber: Yup.string().matches(/^\d{2,3}-\d{3,4}-\d{4}$/).required(),
                    openTime: Yup.string().required(),
                    endTime: Yup.string().required(),
                    introduction: Yup.string().required(),
                })}
            >
                <Form className="form">

                    <Field className="input-field" name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component="" />

                    <Field className="input-field" name="businessId" type="text" placeholder="businessId:" />

                    <Field className="input-field" name="email" type="email" placeholder="email:" />
                    <ErrorMessage name="email" component="" />

                    <Field className="input-field" name="password" type="password" placeholder="password:" />
                    <ErrorMessage name="businessId" component="" />

                    <Field className="input-field" name="address" type="text" placeholder="address:" />
                    <ErrorMessage name="address" component="" />

                    <Field className="input-field" name="phoneNumber" type="tel" placeholder="phoneNumber:" />
                    <ErrorMessage name="phoneNumber" component="" />

                    <Field className="input-field" name="openTime" type="time" placeholder="openTime:" />
                    <ErrorMessage name="openTime" component="" />

                    <Field className="input-field" name="endTime" type="time" placeholder="endTime:" />
                    <ErrorMessage name="endTime" component="" />

                    <Field className="input-field" as="textarea" name="introduction" type="text" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="" />

                    <Field className="input-field" name="imageUrlList" type="file" placeholder="imageUrlList:" />
                    <ErrorMessage name="imageUrlList" component="" />

                    <Field className="input-field" name="snsUriList" type="url" placeholder="snsUriList:" />
                    <ErrorMessage name="snsUriList" component="" />

                    <button id="shop-register-button" > 등록 </button>
                    <button onClick={pageHandler}>일반 회원가입</button>
                </Form>
            </Formik>
        </>
    )
}