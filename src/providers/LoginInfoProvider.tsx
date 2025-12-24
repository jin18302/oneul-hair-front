import { useState } from "react";
import { LoginInfoContext } from "../contexts/LoginInfoContext";

export default function LoginInfoProvider({children}:{ children: React.ReactNode;}) {

    const [isLoggedIn, setIsLogin] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    return (
        <>
            <LoginInfoContext.Provider value={{ isLoggedIn, setIsLogin, userName, setUserName }}>
                {children}
            </LoginInfoContext.Provider>
        </>
    );
}