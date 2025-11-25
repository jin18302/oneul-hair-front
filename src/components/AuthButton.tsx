import { Link } from "react-router";
import "../styles/AuthButton.css";


export default function AuthButton(){
    return(
        <Link to="/auth/login"><button id="auth-button">로그인/회원가입</button></Link>
    )
}