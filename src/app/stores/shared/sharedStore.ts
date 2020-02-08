import {RootStore} from "../rootStore";
import {action, observable, reaction} from "mobx";

export default class SharedStore {
    rootStore: RootStore;

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded: boolean = false;


    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token)
                } else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }



    @action setToken(token: string | null) {
        this.token = token;
    }

    @action setApploaded() {
        this.appLoaded = true;
    }
}
