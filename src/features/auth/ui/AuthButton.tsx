import { useNavigate } from "react-router";
// import "../../styles/AuthButton.css";


export default function AuthButton(){

    console.log("AuthButton rendering")

    const nav = useNavigate();

    const buttonHandler = () => {
        nav('/sign-in');
    }
    return(
        <button id="auth-button" onClick={buttonHandler}>로그인/회원가입</button>
    )
}