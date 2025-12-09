import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../AxiosInstance";
import type { DesignerDetail } from "../types/DesignerDetail";
import Calendar from "./Calendar";

export default function DesignerDetail() {

    const { designerId } = useParams<{ designerId: string }>();

    const detailInit = {
        id: 0,
        shopId: 0,
        name: "",
        profileImage: "",
        introduction: "",
        imageUrlList: [],
        snsUrlList: []
    }

    const [designerDetail, setDesignerDetail] = useState<DesignerDetail>(detailInit);
    const [isButtonClick, setButtonClick] = useState<boolean>(false);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    useEffect(() => {

        const apiHandler = async () => {

            console.log("designer-detail loding");
            const response = await axiosInstance.get<DesignerDetail>(`/designers/${designerId}`);

            setDesignerDetail(response.data);
            setIsLoding(false);
        }

        apiHandler();

    }, []);

    const buttonHandler = () => { setButtonClick(true); };

    if (isLoding) { return <div>로딩중입니다...</div> };

    return (
        <>

            <div className="designer-detail">

            </div>
            {!isLoding &&
                <div> <div className="images"> profile-image</div>
                    <p>{designerDetail?.introduction}</p>
                    <button className="reservation-button" onClick={buttonHandler}>예약하기</button></div>
            }

            {isButtonClick && <Calendar designerId={designerDetail?.id} />}
        </>
    )
}