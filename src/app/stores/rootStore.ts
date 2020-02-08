import SettingsStore from "./settings/settingsStore";
import BotStore from "./bot/botStore";
import UserStore from "./user/userStore";
import {createContext} from "react";
import {configure} from "mobx";
import SharedStore from "./shared/sharedStore";


configure({enforceActions: 'always'});

export class RootStore {
    settingsStore: SettingsStore;
    botStore: BotStore;
    userStore: UserStore;
    sharedStore: SharedStore;


    constructor() {
        this.settingsStore = new SettingsStore(this);
        this.botStore = new BotStore(this);
        this.userStore = new UserStore(this);
        this.sharedStore = new SharedStore(this);
    }
}


export const RootStoreContext = createContext(new RootStore());
