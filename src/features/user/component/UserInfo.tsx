
import { useNavigate } from "react-router";
import { useGetUserInfoQuery } from "../hook/useUserQuery";
import ImagePreview from "../../image/components/ImagePreview";

export default function UserInfo() {

    console.log("UserInfo rendering");

    const navigator = useNavigate();
    const { data: userInfo } = useGetUserInfoQuery();

    const infoUpdatePageHandler = () => { navigator('/users') }
    const pwUpdatePageHandler = () => { navigator('/password') }
    // const userDeleteHandler = () => {navigator('/password')}

    return (
        <div className="col-start-2 col-end-12 row-start-2 row-end-12 w-200 h-auto bg-white border border-black">
            {userInfo.profileImage && <ImagePreview image={userInfo?.profileImage} />}
            <p > 이름 : {userInfo?.name}</p>
            <p > email : {userInfo?.email}</p>
            <p > userRole : {userInfo?.userRole}</p>
            <p > 성별 : {userInfo?.gender}</p>
            <p > 회원가입 일자 : {userInfo?.createdAt.substring(0, 10)}</p>

            <button onClick={() => infoUpdatePageHandler()}>정보 수정</button>
            <button onClick={() => pwUpdatePageHandler()}>비밀번호 수정</button>
            <button>회원 탈퇴</button>
        </div>
    )
}