import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../AxiosInstance";
import { userInfoStore } from "../../contexts/userInfoStore";
import { designerDetailInit, type DesignerDetail } from "../../types/DesignerDetail";
import MenuView from "../MenuView";


export default function DesignerDetail() {

    const { designerId } = useParams();
    const userType = userInfoStore(r => r.userRole);
    const navigator = useNavigate();

    const [designerDetail, setDesignerDetail] = useState<DesignerDetail>(designerDetailInit);
    const [isLoding, setIsLoding] = useState<boolean>(true);


    useEffect(() => {

        const apiHandler = async () => {
            const response = await axiosInstance.get<DesignerDetail>(`/auth/designers/${designerId}`);

            setDesignerDetail(response.data);
            setIsLoding(false);
        }

        apiHandler();

    }, []);


    const reservationButtonHandler = () => {
        const token = localStorage.getItem("token");

        if (token == null) {
            alert("해당 서비스는 로그인 후 가능합니다.");
            navigator("/auth/sign-in");
        }

        navigator(`/designers/${designerId}/reservations`);
    };

    const editPageHandler = () => { navigator(`/designers/${designerId}/edit`) };


    if (isLoding) { return <div>로딩중입니다...</div> };

    return (
        <>

            <div className="designer-detail">


                <div className="designer-profile">
                    <div className="images"> profile-image</div>
                    <p>{designerDetail.name}</p>
                    <p>{designerDetail?.introduction}</p>
                    {userType == "OWNER" && <button onClick={editPageHandler}>프로필 수정</button>}
                </div>

                <MenuView designerId={designerId}/>

                {userType == "USER" && <button className="reservation-button" onClick={reservationButtonHandler}>예약하기</button>}
            </div>

        </>
    )
}