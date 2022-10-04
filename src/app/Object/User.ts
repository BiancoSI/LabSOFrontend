export interface User{
    access_token:string;
    refresh_token:string;
    roles:string[];
    username:string;
};
export interface Client {
    username:string;
    password:string;
    firstName:string;
    lastName:string;
    email:string;
}