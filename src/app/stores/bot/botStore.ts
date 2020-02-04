import {action, configure, observable, runInAction} from "mobx";
import {IBot} from "../../models/Bot";
import agent from "../../api/agent";
import {createContext} from "react";

configure({enforceActions: 'always'});

class BotStore {
    @observable botRegistry = new Map();
    @observable botList: IBot[] = [];
    @observable selectedBot: IBot | null = null;
    @observable loadingBotList: boolean = false;

    @action loadBotList = async () => {
        this.loadingBotList = true;
        this.botRegistry.clear();
        try {
            const botList = await agent.Bot.list();
            runInAction('loading bot list',() => {
                botList.forEach(settings => {
                    console.log(settings);
                    this.botRegistry.set(settings.id, settings)
                });
                this.botList = Array.from(this.botRegistry.values());
                this.setSelectedBot(botList[0]);
                this.loadingBotList = false;
            });
        } catch (e) {
            runInAction('error loading bot list',() => {
                console.log(e);
                this.loadingBotList = false;
            })
        }
    };

    @action setSelectedBot(bot: IBot) {
        console.log('yo in set: ', bot);
        this.selectedBot = bot;
    };

}

export default createContext(new BotStore())
