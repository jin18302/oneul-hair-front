import { useEffect, useState } from "react";
import { axiosInstance } from "../../../AxiosInstance";
import type { UserRes } from "../../../types/UserRes";
import "../../../styles/UserInfo.css"
import { useNavigate } from "react-router";

export default function UserInfo() {

    console.log("UserInfo rendering");

    const [userInfo, setUserInfo] = useState<UserRes>();
    const [isLoding, setIsLoding] = useState<boolean>(false);

    const navigator = useNavigate();

    const infoUpdatePageHandler = () => {navigator('/users')}
    const pwUpdatePageHandler = () =>{navigator('/password')}
    // const userDeleteHandler = () => {navigator('/password')}

    useEffect(() => {

        const apiHandler = async () => {

            const token = localStorage.getItem("token");
            const response = await axiosInstance.get<UserRes>(`/users`, {
                headers: { 'Authorization': token }
            });
            setUserInfo(response.data);
            setIsLoding(false);
        };
        apiHandler();
       
    }, []);

    if (isLoding) { return <div>Loding...</div> }

    return (
        <>
            {!isLoding &&
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
            }
        </>
    )
}