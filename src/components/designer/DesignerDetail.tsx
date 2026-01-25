import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../../utils/AxiosInstance";
import { designerDetailInit, type DesignerDetail } from "../../types/DesignerDetail";
import MenuListView from "../menu/MenuListView";
import { useLoginInfoStore } from "../../contexts/loginInfoStore";



export default function DesignerDetail() {

    const { designerId } = useParams();
    const navigator = useNavigate();
    const userRole = useLoginInfoStore(s => s.userRole);

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
                </div>
                {
                    userRole == "OWNER"
                        ? <button onClick={editPageHandler}>프로필 수정</button>
                        : <button className="reservation-button" onClick={reservationButtonHandler}>예약하기</button>
                }

                <MenuListView designerId={Number(designerId)} menuClickFuntion={undefined} />
            </div>

        </>
    )
}