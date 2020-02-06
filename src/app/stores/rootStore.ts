import SettingsStore from "./settings/settingsStore";
import BotStore from "./bot/botStore";
import UserStore from "./user/userStore";
import {createContext} from "react";
import {configure} from "mobx";


configure({enforceActions: 'always'});

export class RootStore {
    settingsStore: SettingsStore;
    botStore: BotStore;
    userStore: UserStore;


    constructor() {
        this.settingsStore = new SettingsStore(this);
        this.botStore = new BotStore(this);
        this.userStore = new UserStore(this);
    }
}


export const RootStoreContext = createContext(new RootStore());
