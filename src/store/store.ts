
import {makeAutoObservable} from "mobx";
import { IUser } from "../components/Authorization/models/IUser";
import AuthService from "../components/Authorization/services/AuthService";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        this.checkAuth();
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async registration(email: string, userName: string, password: string) {
        try {
            const response = await AuthService.registration(email, userName, password);
            console.log(response);
        } catch (e) {
            throw e;
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('userName', response.data.userName);
            console.log(response);
            this.setAuth(true);
            this.setUser({email: response.data.email, userId: response.data.userId, userName: response.data.userName});
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            throw e;
        }
    }

    async checkAuth(){
        try {
            const response = await AuthService.checkAuth();
            const email = localStorage.getItem('email');
            if(email != null){
                this.setUser({email: localStorage.getItem('email'), userId: localStorage.getItem('userId'), userName: localStorage.getItem('userName')});
                this.setAuth(true);
            } else {
                console.log('Unauthorized');
            }
            console.log(response);
        } catch (error) {
            console.error('Error while checking authentication:', error);
        }
    }
}