// import "../../../styles/UserInfo.css";

import { useNavigate } from "react-router";
import { useGetUserInfoQuery } from "../hook/useUserQuery";

export default function UserInfo() {

    console.log("UserInfo rendering");
    
    const navigator = useNavigate();
    const{data: userInfo} = useGetUserInfoQuery();

    const infoUpdatePageHandler = () => { navigator('/users') }
    const pwUpdatePageHandler = () => { navigator('/password') }
    // const userDeleteHandler = () => {navigator('/password')}

    return (
                <div className="user-info-container">
                    <p className="user-info-element"> 이름 : {userInfo?.name}</p>
                    <p className="user-info-element" > email : {userInfo?.email}</p>
                    <p className="user-info-element"> userRole : {userInfo?.userRole}</p>
                    <p className="user-info-element"> 성별 : {userInfo?.gender}</p>
                    <p className="user-info-element" > 회원가입 일자 : {userInfo?.createdAt.substring(0, 10)}</p>

                    <button onClick={() => infoUpdatePageHandler()}>정보 수정</button>
                    <button onClick={() => pwUpdatePageHandler()}>비밀번호 수정</button>
                    <button>회원 탈퇴</button>
                </div>
    )
}