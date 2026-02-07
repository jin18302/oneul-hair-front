import { useState } from "react";

export function useRegisterType(){// 이거를 

    const [registerType, setRegisterType] = useState<string>("USER");
    return {registerType, setRegisterType};
}