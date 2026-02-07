
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useGetShopQuery, useGetShopTagQuery, useUpdateShopQuery } from "../hook/useShopQuery";
import type { ShopTag } from "../type/entity";
import { shopDetailInit } from "../type/response";

export default function ShopDetailEdit() {

    const navigator = useNavigate();

    const { data: shopDetail } = useGetShopQuery("");
    const { data: shopTagList } = useGetShopTagQuery();
    const { mutateAsync: updateShop } = useUpdateShopQuery();
    const [selectTagIdList, setSelectTagIdList] = useState<number[]>([]);

    useEffect(() => {
        const apiHandler = async () => {
            const prevSelectedTag = shopTagList?.filter(t => shopDetail?.shopTagList.includes(t.name));
            setSelectTagIdList(prevSelectedTag?.map(t => t.id) ?? []);
        };
        apiHandler();
    }, []);

    const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, newTag: ShopTag) => {
        if (e.target.checked) {
            setSelectTagIdList((prev) => [...prev, newTag.id]);
        } else {
            setSelectTagIdList(selectTagIdList.filter(t => t != newTag.id));
        }
    }

    return (

        <div className="form-container">
            <Formik initialValues={shopDetail ?? shopDetailInit}
                onSubmit={async (data, { setSubmitting }) => {

                    setSubmitting(true);
                    updateShop({shopId: shopDetail.id, body: data});


                    alert("정보 수정이 완료되었습니다.");
                    navigator("/my/shops");
                    setSubmitting(false);
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string().max(15, "shop name은 최대 15글자까지 가능합니다").required(),
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

                    {/* <Field className="input-field" name="imageUrlList" type="file" placeholder="imageUrlList:" />
                        <ErrorMessage name="imageUrlList" component="" /> */}

                    <Field className="input-field" name="snsUriList" type="url" placeholder="snsUriList:" />
                    <ErrorMessage name="snsUriList" component="" />

                    <div>
                        <h3>shopTag list</h3>
                        {shopTagList?.map(tag => (
                            <div key={tag.id}>
                                <input type="checkBox" id={tag.name}
                                    checked={selectTagIdList.includes(tag.id)}
                                    onChange={(e) => checkHandler(e, tag)}
                                />
                                <label htmlFor={tag.name}>{tag.name}</label>
                                <br />
                            </div>
                        ))}
                    </div>

                    <button type="submit">확인</button>
                </Form>
            </Formik>
        </div>
    )
}