import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../AxiosInstance";
import type { DesignerDetail } from "../types/DesignerDetail";

export default function DesignerDetail() {

    const { designerId } = useParams();
    const navigate = useNavigate();

    const detailInit = {
        id: 0,
        shopId: 0,
        name: "",
        profileImage: "",
        introduction: "",
        imageUrlList: [],
        snsUrlList: []
    };

    const [designerDetail, setDesignerDetail] = useState<DesignerDetail>(detailInit);
    const [isLoding, setIsLoding] = useState<boolean>(true);

    
    useEffect(() => {

        const apiHandler = async () => {
            const response = await axiosInstance.get<DesignerDetail>(`/auth/designers/${designerId}`);

            setDesignerDetail(response.data);
            setIsLoding(false);
        }

        apiHandler();

    }, []);


    const reservationButtonHandler = () => { navigate(`/designers/${designerId}/reservations`); };


    if (isLoding) { return <div>로딩중입니다...</div> };

    return (
        <>

            <div className="designer-detail">

                {!isLoding &&
                    <div> <div className="images"> profile-image</div>
                        <p>{designerDetail?.introduction}</p>
                        <button className="reservation-button" onClick={reservationButtonHandler}>예약하기</button></div>
                }
            </div>

        </>
    )
}