import { useNavigate } from "react-router";
import { useLoginInfoStore } from "../../../../contexts/loginInfoStore";

export default function ShopOwnerMyPage() {

    const navigator = useNavigate();
    
    const userName = useLoginInfoStore(s => s.userName);
    const logOut = useLoginInfoStore(s => s.logOut);

    return (
        <>
            <div className="user-info">
                <p>{userName}님</p>
                <button onClick={logOut}>로그아웃</button>
            </div>

            <div onClick={() => navigator("/my/shops")}>shop 정보관리</div>
            <div onClick={() => navigator("/shops/schedules")}>스케줄 관리</div>
            <div onClick={() => navigator("my/designers/management")}>디자이너 관리</div>
        </>
    )

}