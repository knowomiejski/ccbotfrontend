import {action, computed, observable, runInAction} from "mobx";
import {IUser, IUserLoginFormValues} from "../../models/User";
import agent from "../../api/agent";
import {RootStore} from "../rootStore";

export default class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action
    async login(loginFormValues: IUserLoginFormValues) {
        try {
            const user = await agent.User.login(loginFormValues);
            runInAction('logging in user', () => {
                console.log(user);
            })
        } catch (e) {
            console.log(e);
        }
    }
}
