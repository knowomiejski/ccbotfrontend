import {RootStore} from "../rootStore";
import {action, observable, reaction} from "mobx";
import {IBot} from "../../models/Bot";

export default class SharedStore {
    rootStore: RootStore;

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded: boolean = false;
    @observable selectedProgram: string | null = null;
    @observable runningBots: IBot[] = [];


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

    @action addRunningBot(bot: IBot) {
        this.runningBots.push(bot)
    }

    @action removeRunningBot(bot: IBot) {
        const botIndex = this.runningBots.indexOf(bot);
        this.runningBots.splice(botIndex);
    }

    @action setToken(token: string | null) {
        this.token = token;
    }

    @action setApploaded() {
        this.appLoaded = true;
    }

    @action setSelectedProgram(type: string | null) {
        this.selectedProgram = type;
    }

}
