import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

import type { ShopTag } from "../type/entity";
import { useGetShopTagQuery, useCreateShopQuery } from "../hook/useShopQuery";

export default function ShopRegistration({ setRegisterType }: { setRegisterType: (t: string) => void }) {

    console.log("ShopRegistration rendering");
    // TODO: 리팩토링 필요

    const [selectTagIdList, setSelectTagIdList] = useState<number[]>([]);
    const {data: shopTagList} = useGetShopTagQuery();
    const {mutateAsync: createShop} = useCreateShopQuery();

   

    const pageHandler = () => setRegisterType("USER");

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, newTag: ShopTag) => {
        if (e.target.checked) {
            setSelectTagIdList((prev) => [...prev, newTag.id]);
        } else {
            setSelectTagIdList(selectTagIdList.filter(t => t != newTag.id));
        }
    }

    return (
                <div className="form-container">
                    <Formik initialValues={{
                        name: "", businessId: "", email: "", password: "", address: "", phoneNumber: "",
                        openTime: "", endTime: "", introduction: "", imageUrlList: "", snsUriList: ""
                    }}
                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            const request = {
                                name: data.name,
                                businessId: data.businessId,
                                address: data.address,
                                phoneNumber: data.phoneNumber,
                                openTime: data.openTime,
                                endTime: data.endTime,
                                introduction: data.introduction,
                                snsUriList: [],
                                shopTagList: selectTagIdList,
                                ownerSignUpRequest: {
                                    name: data.name,
                                    email: data.email,
                                    password: data.password,
                                    phoneNumber: data.phoneNumber,
                                    gender: null,
                                    userRole: "OWNER"
                                }
                            }

                            await createShop(request);

                            alert("등록이 완료되었습니다.");
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
                        <Form className="form">
                            {/*  */}
                            <Field className="input-field" name="name" type="text" placeholder="name:" />
                            <ErrorMessage name="name" component="" />

                            <Field className="input-field" name="email" type="email" placeholder="email:" />
                            <ErrorMessage name="email" component="" />

                            <Field className="input-field" name="password" type="password" placeholder="password:" />
                            <ErrorMessage name="password" component="" />

                            <Field className="input-field" name="phoneNumber" type="tell" placeholder="phoneNumber:" />
                            <ErrorMessage name="phoneNumber" component="" />
                            {/* 공통 */}

                            <Field className="input-field" name="businessId" type="text" placeholder="businessId:" />
                            <ErrorMessage name="businessId" component="" />

                            <Field className="input-field" name="address" type="text" placeholder="address:" />
                            <ErrorMessage name="address" component="" />

                            <Field className="input-field" name="openTime" type="time" placeholder="openTime:" />
                            <ErrorMessage name="openTime" component="" />

                            <Field className="input-field" name="endTime" type="time" placeholder="endTime:" />
                            <ErrorMessage name="endTime" component="" />

                            <Field className="input-field" as="textarea" name="introduction" type="text" placeholder="introduction:" />
                            <ErrorMessage name="introduction" component="" />

                            <Field className="input-field" name="snsUriList" type="url" placeholder="snsUriList:" />
                            <ErrorMessage name="snsUriList" component="" />

                            <div>
                                <h2>shopTag list</h2>
                                {shopTagList.map(tag => (
                                    <>
                                        <input key={tag.id} type="checkbox" id={tag.name}
                                            checked={selectTagIdList.includes(tag.id)}
                                            onChange={(e) => checkHandler(e, tag)}
                                        />
                                        <label htmlFor={tag.name}>{tag.name}</label>
                                        <br />
                                    </>
                                ))}
                            </div>

                            <button type="submit" id="shop-register-button" > 등록 </button>

                        </Form>
                    </Formik>
                    <button type="button" onClick={pageHandler}>일반 회원가입</button>
                </div>
    )
}