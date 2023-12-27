const LOCAL_STORAGE_ID = "id";
const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_ROLE = "role";


export function getUserId() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID))
}

export function getUserToken() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN))
}

export function getUserRole() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ROLE))
}

export function setUserLocalStorageData(id, token, role){
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(id))
    localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(token))
    localStorage.setItem(LOCAL_STORAGE_ROLE, JSON.stringify(role))
}

export function removeUserLocalStorageData()
{
    localStorage.removeItem(LOCAL_STORAGE_ID);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_ROLE);
}

export function isUserLoggedIn() {
    return (typeof getUserId() === "number")
}


export function isTheUserAnOrganizer(){
    return (getUserRole() === "ROLE_ORGANIZER");
}

export function isTheUserAnAdmin(){
    return (getUserRole() === "ROLE_ADMIN");
}
