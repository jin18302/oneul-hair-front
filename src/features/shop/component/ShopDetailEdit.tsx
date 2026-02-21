
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import CheckBoxGroup from "../../../common/commponent/CheckBoxGroup";
import ImageEditor from "../../image/components/ImageEditor";
import { useGetMyShopQuery, useGetShopTagQuery, useUpdateShopQuery } from "../hook/useShopQuery";

export default function ShopDetailEdit() {

    console.log("ShopDetailEdit rerendering");

    const navigator = useNavigate();

    const { data: shopDetail } = useGetMyShopQuery();
    const { data: shopTagList } = useGetShopTagQuery();
    const { mutateAsync: updateShop } = useUpdateShopQuery();

    // shopDetail을 업데이트 샵 리퀘스트로 바인딩 시키고, 이미지 소스는 일단 프리뷰로만 설정한다.

    const updateRequest =  {
    name: shopDetail.name,
    address: shopDetail.address,
    phoneNumber: shopDetail.phoneNumber,
    openTime: shopDetail.openTime,
    endTime: shopDetail.endTime,
    introduction: shopDetail.introduction,
    snsUriList: shopDetail.snsUriList,
    shopTagIdSet: shopDetail.shopTagIdSet.map(t => t.id),
    mainImage : ""
}

    return (

       
            <Formik initialValues={updateRequest}
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

                <Form className="flex flex-col justify-center items-center w-full">

                    <ImageEditor currentImage={shopDetail.mainImage} fieldName={"mainImage"}/>

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="name" type="text" placeholder="name:" />
                    <ErrorMessage name="name" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="address" type="text" placeholder="address:" />
                    <ErrorMessage name="address" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="phoneNumber" type="tel" placeholder="phoneNumber:" />
                    <ErrorMessage name="phoneNumber" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="openTime" type="time" placeholder="openTime:" />
                    <ErrorMessage name="openTime" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="endTime" type="time" placeholder="endTime:" />
                    <ErrorMessage name="endTime" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" as="textarea" name="introduction" type="text" placeholder="introduction:" />
                    <ErrorMessage name="introduction" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="mainImage" type="file" />
                    <ErrorMessage name="imageUrlList" component="" />

                    <Field className="w-[90%] h-12.5 mb-2.5 bg-[#D9D9D9] rounded-[5px]" name="snsUriList" type="url" placeholder="snsUriList:" />
                    <ErrorMessage name="snsUriList" component="" />

                    <CheckBoxGroup itemList={shopTagList} field={"shopTagIdSet"}/>

                    <button type="submit">확인</button>
                </Form>
            </Formik>
    )
}