
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import CheckBoxGroup from "../../../common/commponent/CheckBoxGroup";
import InputField from "../../../common/commponent/InputField";
import ImageEditor from "../../image/components/ImageEditor";
import { useGetMyShopQuery, useGetShopTagQuery, useUpdateShopQuery } from "../hook/useShopQuery";

export default function ShopDetailEdit() {

    console.log("ShopDetailEdit rerendering");

    const navigator = useNavigate();

    const { data: shopDetail } = useGetMyShopQuery();
    const { data: shopTagList } = useGetShopTagQuery();
    const { mutateAsync: updateShop } = useUpdateShopQuery();

    // shopDetail을 업데이트 샵 리퀘스트로 바인딩 시키고, 이미지 소스는 일단 프리뷰로만 설정한다.

    const updateRequest = {
        name: shopDetail.name,
        address: shopDetail.address,
        phoneNumber: shopDetail.phoneNumber,
        openTime: shopDetail.openTime,
        endTime: shopDetail.endTime,
        introduction: shopDetail.introduction,
        snsUriList: shopDetail.snsUriList,
        shopTagIdSet: shopDetail.shopTagIdSet.map(t => t.id),
        mainImage: ""
    }

    return (


        <Formik initialValues={updateRequest}
            onSubmit={async (data, { setSubmitting }) => {

                setSubmitting(true);
                updateShop({ shopId: shopDetail.id, body: data });


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

                <ImageEditor currentImage={shopDetail.mainImage} fieldName={"mainImage"} />
                <InputField name="name" type="name" placeholder="name:" />
                <InputField name="email" type="email" placeholder="email:" />
                <InputField name="password" type="password" placeholder="password:" />
                <InputField name="phoneNumber" type="tell" placeholder="phoneNumber:" />
                <InputField name="businessId" type="text" placeholder="businessId:" />
                <InputField name="address" type="text" placeholder="address:" />
                {/* TODO */}
                <InputField name="openTime" type="time" label={true} />
                <InputField name="endTime" type="time" label={true} />
                <InputField name="introduction" type="text" placeholder="introduction:" />
                <InputField name="snsUriList" type="text" placeholder="snsUri:" />
                <CheckBoxGroup itemList={shopTagList} field="shopTagIdSet" />

                <button type="submit">확인</button>
            </Form>
        </Formik>
    )
}