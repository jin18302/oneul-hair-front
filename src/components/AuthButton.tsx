import { useNavigate } from "react-router";
import "../styles/AuthButton.css";


export default function AuthButton(){

    const nav = useNavigate();

    const buttonHandler = () => {
        nav('/auth/sign-in');
    }
    return(
        <button id="auth-button" onClick={buttonHandler}>로그인/회원가입</button>
    )
}