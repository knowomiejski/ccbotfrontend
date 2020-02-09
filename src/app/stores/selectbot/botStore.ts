import {action, configure, observable, runInAction} from "mobx";
import {IBot} from "../../models/Bot";
import agent from "../../api/agent";
import {RootStore} from "../rootStore";

configure({enforceActions: 'always'});

export default class BotStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable botRegistry = new Map();
    @observable botList: IBot[] = [];
    @observable selectedBot: IBot | null = null;
    @observable loadingBotList: boolean = false;

    @action loadBotList = async () => {
        this.loadingBotList = true;
        this.botRegistry.clear();
        try {
            const botList = await agent.Bot.list();
            runInAction('loading selectbot list', () => {
                this.populateBotList(botList)
            });
        } catch (e) {
            runInAction('error loading selectbot list', () => {
                console.log(e);
                this.loadingBotList = false;
            })
        }
    };

    @action loadBotTypeList = async (type: string) => {
        this.loadingBotList = true;
        this.botRegistry.clear();
        try {
            const botList = await agent.Bot.listType(type);
            runInAction('loading selectbot listtypes', () => {
                this.populateBotList(botList)
            });
        } catch (e) {
            runInAction('error loading selectbot listtypes', () => {
                console.log(e);
                this.loadingBotList = false;
            })
        }
    };

    @action private populateBotList(botList: IBot[]) {
        botList.forEach(bot => {
            console.log(bot);
            this.botRegistry.set(bot.id, bot)
        });
        this.botList = Array.from(this.botRegistry.values());
        this.setSelectedBot(botList[0]);
        this.loadingBotList = false;
    }

    @action setSelectedBot(bot: IBot) {
        console.log('yo in set: ', bot);
        this.selectedBot = bot;
    };

}
