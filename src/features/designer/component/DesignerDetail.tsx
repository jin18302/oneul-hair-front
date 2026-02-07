import { useNavigate, useParams } from "react-router";
import { useLoginInfoStore } from "../../../contexts/loginInfoStore";
import MenuListView from "../../menu/component/MenuListView";
import { useGetDesignerInfo } from "../hook/useDesignerQuery";
// import MenuListView from "../../menu/component/MenuListView";

export default function DesignerDetail() {

    console.log("designer detail rendering");

    const { designerId } = useParams() as {designerId: string};
    const navigator = useNavigate();
    const userRole = useLoginInfoStore(s => s.userRole);
    const { data: designerDetail} = useGetDesignerInfo(designerId);

    const reservationButtonHandler = () => {
        const token = localStorage.getItem("token");

        if (token == null) {
            alert("해당 서비스는 로그인 후 가능합니다.");
            navigator("/auth/sign-in");
        }

        navigator(`/designers/${designerId}/reservations`);
    };

    const editPageHandler = () => { navigator(`/designers/${designerId}/edit`) };

    return (
        <>

            <div className="designer-detail">
                <div className="designer-profile">
                    <div className="images"> profile-image</div>
                    <p>{designerDetail.name}</p>
                    <p>{designerDetail.introduction}</p>
                </div>
                {
                    userRole == "OWNER"
                        ? <button onClick={editPageHandler}>프로필 수정</button>
                        : <button className="reservation-button" onClick={reservationButtonHandler}>예약하기</button>
                }

                <MenuListView designerId={designerId} menuClickFuntion={undefined} />
            </div>

        </>
    )
}