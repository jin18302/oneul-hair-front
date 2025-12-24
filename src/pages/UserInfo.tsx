import { useEffect, useState } from "react";
import { axiosInstance } from "../AxiosInstance";
import type { UserRes } from "../types/UserRes";
import "../styles/UserInfo.css"
import { useNavigate } from "react-router";

export default function UserInfo() {

    const [userInfo, setUserInfo] = useState<UserRes>();
    const [isLoding, setIsLoding] = useState<boolean>(false);

    const navigator = useNavigate();

    const infoUpdatePageHandler = () => {navigator('/users')}

    const pwUpdatePageHandler = () =>{navigator('/')}

    useEffect(() => {

        const apiHandler = async () => {

            const token = localStorage.getItem("token");
            console.log("token", token);

            const response = await axiosInstance.get<UserRes>(`/users`, {
                headers: { 'Authorization': token }
            }
            );
            setUserInfo(response.data);
        };
        apiHandler();
        setIsLoding(false);
    }, []);

    if (isLoding) { return <div>Loding...</div> }

    return (
        <>
            {!isLoding &&
                    <div className="user-info-container">
                        <p className="user-info-element">name : {userInfo?.name}</p>
                        <p className="user-info-element" >email : {userInfo?.email}</p>
                        <p className="user-info-element">userRole : {userInfo?.userRole}</p>
                        <p className="user-info-element">gender : {userInfo?.gender}</p>

                        <button onClick={() =>infoUpdatePageHandler()}>정보 수정</button>
                        <button onClick={() => pwUpdatePageHandler()}>비밀번호 수정</button>
                        <button>회원 탈퇴</button>
                    </div>
            }
        </>
    )
}