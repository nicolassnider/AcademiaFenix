/* eslint-disable no-useless-catch */

import { User, UserFormValues } from "../models/user";
import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import { router } from "../router/Routes";
import { store } from "./store";

export class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            console.log(user)
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/students');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }

    }

    register = async(creds:UserFormValues)=>{
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>this.user=user);
            router.navigate('/register');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('userId');
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(()=>this.user=user);
        } catch (error) {
            throw error
        }
    }

    setImage=(image:string)=>{
        if(this.user) this.user.image=image;

    }

    setDisplayName = (name:string)=>{
        if(this.user) this.user.displayName=name;        
    }
}