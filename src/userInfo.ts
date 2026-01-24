

export function getIsLoggedIn(){
    return localStorage.getItem("userInfo") == null ? false : true;
}

export function getUserInfo(){
     return JSON.parse(localStorage.getItem("userInfo")??"");
}
