
let _accessToken: string | undefined = undefined;

export function setAccessToken(token: string) {
    _accessToken = token;
}

export function getAccessToken() {
    return _accessToken;
}

export function resetToken() {
    _accessToken = "";
}

export function hasAccessToken(){
    return _accessToken != undefined;
}