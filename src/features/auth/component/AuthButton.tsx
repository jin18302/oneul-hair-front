import { useNavigate } from "react-router";


export default function AuthButton(){

    console.log("AuthButton rendering")

    const nav = useNavigate();
    const buttonHandler = () => {nav('/sign-in');}

    return(
        <>
          <button className="bg-[#258c65]" onClick={buttonHandler}>로그인/회원가입</button>
        </>
      
    )
}