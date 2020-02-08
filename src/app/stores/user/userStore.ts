import {action, computed, observable, runInAction} from "mobx";
import {IUser, IUserLoginFormValues} from "../../models/User";
import agent from "../../api/agent";
import {RootStore} from "../rootStore";
import {history} from "../../../index";

export default class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;
    @observable loadingLogin: boolean = false;

    @computed get isLoggedIn() {
        console.log(this.user);
        if (this.user !== null) {
            console.log('logged: true');
            return true
        } else {
            console.log('logged: false');
            return false;
        }
    }

    @action
    async login(loginFormValues: IUserLoginFormValues) {
        this.loadingLogin = true;
        console.log('loggin in');
        try {
            const user = await agent.User.login(loginFormValues);
            runInAction('logging in user', () => {
                console.log(user);
                this.user = user;
                this.loadingLogin = false;
                history.push('/');
                this.rootStore.sharedStore.setToken(user.token);
            });

        } catch (e) {
            console.log(e);
            runInAction('error logging in user', () => {
                this.loadingLogin = false;
            });
        }
    }

    @action logout() {
        this.rootStore.sharedStore.setToken(null);
        this.user = null;
        history.push('/');
    }

    @action
    async getUser() {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                console.log('yo 1: ', this.user?.displayName);
                this.user = user;
                console.log('yo 2: ', this.user.displayName);
            })
        } catch (e) {
            console.log(e)
        }
    }
}
