import { useContext } from "react";
import { LoginInfoContext } from "../contexts/LoginInfoContext";

export function useLoginInfo() {
  const context = useContext(LoginInfoContext); 

  if (!context) {// 컨텍스트에 접근할 수 없어 컨텍스트가 가지는 값을 읽어올 수 없다면
    throw new Error(
      "LoginInfoContext는 LoginInfoContext로 감싼 컴포넌트 안에서만 호출할 수 있습니다."
    );
  }
  return context;
}