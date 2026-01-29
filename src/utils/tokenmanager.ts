
let _accessToken = "";

export function setAccessToken(token : string){
    _accessToken = token;
}

export function getAccessToken(){
    return _accessToken;
}

export function resetToken(){
    _accessToken = "";
}