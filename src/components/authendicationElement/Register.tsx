import { useState } from "react"
import SignUp from "./Signup";
import ShopRegistration from "./ShopRegistration";

export default function Register(){

    const [registerType, setRegisterType] = useState<string>("USER");

    if(registerType == "USER"){return <SignUp setRegisterType={setRegisterType}/>}
    else if(registerType == "SHOP"){return <ShopRegistration setRegisterType={() => setRegisterType("USER")}/>}
}