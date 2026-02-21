import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import CheckBoxGroup from "../../../common/commponent/CheckBoxGroup";
import ImageUploader from "../../image/components/ImageUploader";
import { useGetShopTagQuery } from "../../shop/hook/useShopQuery";
import type { ShopTag } from "../../shop/type/entity";
import { type CreateShopReq } from "../../shop/type/request";
import { useOwnerSignupQuery } from "../hook/useAuthQuery";
import { ownerSignUpDataInit } from "../type/formData";
import { useNavigate } from "react-router";

export default function OwnerSignupForm({ setRegisterType }: { setRegisterType: () => void }) {

    console.log("OwnerSignupForm rendering");

    const navigate = useNavigate();
    const { data: shopTagList } = useGetShopTagQuery();
    const { mutateAsync: createShop } = useOwnerSignupQuery();


    return (
        <div className="form-container">
            <Formik initialValues={ownerSignUpDataInit}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    await createShop(data);

                    alert("등록이 완료되었습니다.");
                    navigate("/sign-in");
                    setSubmitting(false);
                    resetForm();

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
                <Form className="flex flex-col justify-center items-center w-full">

                    <ImageUploader fieldName={"mainImage"} />
                    
                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]"name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="email" type="email" placeholder="email:" />
                    <ErrorMessage name="email" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="password" type="password" placeholder="password:" />
                    <ErrorMessage name="password" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="phoneNumber" type="tell" placeholder="phoneNumber:" />
                    <ErrorMessage name="phoneNumber" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="businessId" type="text" placeholder="businessId:" />
                    <ErrorMessage name="businessId" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="address" type="text" placeholder="address:" />
                    <ErrorMessage name="address" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="openTime" type="time" placeholder="openTime:" />
                    <ErrorMessage name="openTime" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="endTime" type="time" placeholder="endTime:" />
                    <ErrorMessage name="endTime" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" as="textarea" name="introduction" type="text" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="snsUriList" type="url" placeholder="snsUriList:" />
                    <ErrorMessage name="snsUriList" component="" />

                    <CheckBoxGroup<ShopTag, CreateShopReq> itemList={shopTagList} field={"shopTagIdSet"}/>

                    <button type="submit" id="block box-border w-[400px] h-[50px] mb-[10px] bg-[##3DADFF]" > 등록 </button>

                </Form>
            </Formik>
            <button type="button" onClick={setRegisterType}>일반 회원가입</button>
        </div>
    )
}