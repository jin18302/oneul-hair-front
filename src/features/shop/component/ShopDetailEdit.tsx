import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { shopDetailInit, type ShopDetailRes } from "../../../types/ShopDetailRes";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { isAxiosError } from "axios";
import type { ShopTag } from "../../../types/ShopTag";
import { useNavigate } from "react-router";
import { getAccessToken } from "../../../utils/tokenmanager";
import { shopService } from "../service/shopService";

export default function ShopDetailEdit() {

    const navigator = useNavigate();

    const [shopDetail, setShopDetail] = useState<ShopDetailRes>(shopDetailInit); 
    const [shopTagList, setShopTagList] = useState<ShopTag[]>([]); 
    const [selectTagIdList, setSelectTagIdList] = useState<number[]>([]);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async () => {
          
                const shopDetailresponose = await shopService.getShopDetailByOwner(getAccessToken());
                const shopTagRespone = await shopService.getShopTagList();

                setShopDetail(shopDetailresponose);
                setShopTagList(shopTagRespone);

                const prevSelectedTag = shopTagRespone.filter(t => shopDetailresponose.shopTagList.includes(t.name));
                setSelectTagIdList(prevSelectedTag.map(t => t.id));
                setIsLoding(false);
        };

        apiHandler();
    }, []);

     const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, newTag: ShopTag) => { 

        if(e.target.checked){
            setSelectTagIdList((prev) => [...prev, newTag.id]);
        }else{
           setSelectTagIdList(selectTagIdList.filter(t => t != newTag.id));
        }
    }


    if (isLoding) { return <div>Loding...</div> }

    return (

        <div className="form-container">

            {!isLoding &&

                <Formik initialValues={shopDetail}
                    onSubmit={async (data, { setSubmitting }) => {

                        setSubmitting(true);

                        try {
                            await axiosInstance.patch<ShopDetailRes>(`/shops/${shopDetail.id}`, {
                                name: data.name,
                                address: data.address,
                                phoneNumber: data.phoneNumber,
                                openTime: data.openTime,
                                endTime: data.endTime,
                                introduction: data.introduction,
                                imageUrlList: [],
                                snsUriList: [],
                                shopTagIdSet: selectTagIdList,
                            }, { headers: { 'Authorization': getAccessToken() }});

                            alert("정보 수정이 완료되었습니다.");
                            navigator("/my/shops");

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
                            {shopTagList.map(tag => (
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
            }
        </div>
    )
}