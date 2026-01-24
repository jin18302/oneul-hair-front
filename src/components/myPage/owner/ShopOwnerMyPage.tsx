import { useNavigate } from "react-router";
import { getUserInfo } from "../../../userInfo";

export default function ShopOwnerMyPage() {

    const navigator = useNavigate();
    const userInfo = getUserInfo();

    return (
        <>
            <div className="user-info">
                <p>{userInfo.userName}님</p>
                <button>로그아웃</button>
            </div>

            <div onClick={() => navigator("/my/shops")}>shop 정보관리</div>
            <div onClick={() => navigator("/shops/schedules")}>스케줄 관리</div>
            <div onClick={() => navigator("my/designers/management")}>디자이너 관리</div>

            {/* TODO: 컴포넌트 재사용 가능한쪽으로 리팩 */}
        </>
    )

}