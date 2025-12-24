
import { useNavigate } from "react-router";
import { useLoginInfo } from "../hooks/UseLoginInfo";
import "../styles/MyPage.css";


export default function MyPage() {

    const { userName, setIsLogin } = useLoginInfo();
    const navagator = useNavigate();

    const memberInfoPageHandler = () => { navagator('/users') };
    const reservationHistoryHandler = () => { navagator('/users/reservation-histories') };
    const logoutHandler = () => {
        setIsLogin(false);
        localStorage.removeItem("token");
    };
    
    return (
        <>
            <div className="my-page-container">

                <div className="user-info">
                    <div className="profile-image">profile-image</div>
                    <div className="name">{userName}---님</div>
                    {/* TODO */}

                    <button onClick={() => logoutHandler()}>로그아웃</button>
                </div>

                <div className="member-info" onClick={memberInfoPageHandler}>나의 정보 확인</div>
                <div className="reservation-histories" onClick={reservationHistoryHandler}>예약 내역 조회</div>

                {/* <div>좋아요 한 샵 </div>
            <div>작성한 리뷰리스트</div> */}
            </div>
        </>
    )

}