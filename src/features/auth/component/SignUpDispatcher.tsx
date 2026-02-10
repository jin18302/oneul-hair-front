import { useState } from "react"
import { userRole } from "../type/userRole";
import UserSignUpForm from "./UserSignupForm";
import OwnerSignupForm from "./OwnerSignupForm";

export default function SignUpDispatcher(){

    const [registerType, setRegisterType] = useState<string>(userRole.CUSTOMER);

    if(registerType == userRole.CUSTOMER){return <UserSignUpForm setRegisterType={() =>setRegisterType(userRole.OWNER)}/>}
    else if(registerType == userRole.OWNER){return <OwnerSignupForm setRegisterType={() => setRegisterType(userRole.CUSTOMER)}/>}
}