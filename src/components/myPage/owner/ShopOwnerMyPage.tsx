import { userInfoStore } from "../../../contexts/userInfoStore"

export default function ShopOwnerMyPage() {

    const userName = userInfoStore(s => s.userName);
    const logOut = userInfoStore(s => s.logOut);

    return (
        <>
            <div className="user-info">
                <p>{userName}님</p>
                <button onClick={() => logOut()}>로그아웃</button>
            </div>

            <div>shop 정보관리</div>
            <div>스케줄 관리</div>
            <div>디자이너 관리</div>

        </>
    )

}