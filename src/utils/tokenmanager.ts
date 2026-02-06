
let _accessToken: string;

export function setAccessToken(token: string) {
    _accessToken = token;
}

export function getAccessToken():string {
     console.log("getAccessToken :", _accessToken);
    return _accessToken;
}

export function resetToken() {
    _accessToken = "";
}

export function hasAccessToken(){
    return _accessToken != undefined;
}