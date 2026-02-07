
import { useNavigate } from "react-router";
import { useLoginInfoStore } from "../../../../contexts/loginInfoStore";
// import "../../../styles/MyPage.css";


export default function UserMyPage() {

    console.log("UserMyPage rendering");

    const navagator = useNavigate();

     const userName = useLoginInfoStore(s => s.userName);
        const logOut = useLoginInfoStore(s => s.logOut);

    const memberInfoPageHandler = () => { navagator('/users') };
    const reservationHistoryHandler = () => { navagator('/users/reservation-histories') };


    return (
        <>
            <div className="user-info">
                <p>{userName}님</p>
                <button onClick={logOut}>로그아웃</button>
            </div>

            <div className="member-info" onClick={memberInfoPageHandler}>나의 정보 확인</div>
            <div className="reservation-histories" onClick={reservationHistoryHandler}>예약 내역 조회</div>

            {/* <div>좋아요 한 샵 </div>
            <div>작성한 리뷰리스트</div> */}
        </>
    )

}