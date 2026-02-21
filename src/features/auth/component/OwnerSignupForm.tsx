import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import CheckBoxGroup from "../../../common/commponent/CheckBoxGroup";
import InputField from "../../../common/commponent/InputField";
import ImageUploader from "../../image/components/ImageUploader";
import { useGetShopTagQuery } from "../../shop/hook/useShopQuery";
import type { ShopTag } from "../../shop/type/entity";
import { type CreateShopReq } from "../../shop/type/request";
import { useOwnerSignupQuery } from "../hook/useAuthQuery";
import { ownerSignUpDataInit } from "../type/formData";

export default function OwnerSignupForm({ setRegisterType }: { setRegisterType: () => void }) {

    console.log("OwnerSignupForm rendering");

    const navigate = useNavigate();
    const { data: shopTagList } = useGetShopTagQuery();
    const { mutateAsync: createShop } = useOwnerSignupQuery();


    return (
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

                    <InputField name="name" type="name" placeholder="name:" />
                    <InputField name="email" type="email" placeholder="email:" />
                    <InputField name="password" type="password" placeholder="password:" />
                    <InputField name="phoneNumber" type="tell" placeholder="phoneNumber:" />
                    <InputField name="businessId" type="text" placeholder="businessId:" />
                    <InputField name="address" type="text" placeholder="address:" />
                    {/* TODO */}
                    <InputField name="openTime" type="time" label={true}/>
                    <InputField name="endTime" type="time" label={true} />
                    <InputField name="introduction" type="text" placeholder="introduction:" />
                    <InputField name="snsUriList" type="text" placeholder="snsUri:" />

                    <CheckBoxGroup<ShopTag, CreateShopReq> itemList={shopTagList} field="shopTagIdSet" />

                    <button type="submit" id="block box-border w-[400px] h-[50px] mb-[10px] bg-[##3DADFF]" > 등록 </button>
                    <button type="button" onClick={setRegisterType}>일반 회원가입</button>

                </Form>
            </Formik>
            
       
    )
}