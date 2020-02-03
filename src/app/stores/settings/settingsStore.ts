import {action, configure, observable, runInAction} from 'mobx';
import {createContext} from "react";
import {ISettings} from "../../models/Settings";
import agent from "../../api/agent";

configure({enforceActions: 'always'});

class SettingsStore {
    @observable settingsRegistry = new Map();
    @observable settingsList: ISettings[] = [];
    @observable newSettings: ISettings | null = null;
    @observable selectedSettings: ISettings | null = null;
    @observable formType: string | null = null;
    @observable showForm: boolean = false;
    @observable loadingSettingsList: boolean = false;
    @observable loadingSettingsForm: boolean = false;

    @action loadSettings = async () => {
        this.loadingSettingsList = true;
        this.settingsRegistry.clear();
        try {
            const settingsList = await agent.Settings.list();
            runInAction('loading settings list',() => {
                settingsList.forEach(settings => {
                    this.settingsRegistry.set(settings.id, settings)
                });
                this.settingsList = Array.from(this.settingsRegistry.values());
                this.setSelectedSettings(settingsList[0]);
                this.loadingSettingsList = false;
            });
        } catch (e) {
            runInAction('error loading setting list',() => {
                console.log(e);
                this.loadingSettingsList = false;
            })
        }
    };

    @action setSelectedSettings(selectedSettings: ISettings) {
        console.log('yo in set: ', selectedSettings);
        this.selectedSettings = selectedSettings;
    };

    @action toggleShowForm() {
        if (this.formType === 'Add New' && !this.showForm) {
            this.setSelectedSettings(
                {
                    id: '',
                    name: '',
                    prefix: '',
                    reminderTimer: 0,
                    folderId: ''
                }
            )
        } else if (this.formType === 'Add New' && this.showForm) {
            this.setSelectedSettings(Array.from(this.settingsRegistry.values())[0])
        }
        this.showForm = !this.showForm;
    }

    @action setFormType(formType: string) {
        this.formType = formType;
    }

    @action
    async submitSettings(newSettings: ISettings) {
        this.loadingSettingsForm = true;
        if (this.formType === 'Add New') {
            try {
                const created = await agent.Settings.create(newSettings);
                runInAction('creating setting',() => {
                    this.toggleShowForm();
                    this.loadSettings();
                });
            } catch (e) {
                console.log(e);
                runInAction('error creating setting',() => {
                    this.toggleShowForm();
                    this.loadSettings();
                })
            }
        } else {
            try {
                const updated = await agent.Settings.update(newSettings);
                runInAction('updating setting',() => {
                    this.toggleShowForm();
                    this.loadSettings();
                });
            } catch (e) {
                console.log(e);
                runInAction('error updating setting',() => {
                    this.toggleShowForm();
                    this.loadSettings();
                });
            }
        }
    }

    @action
    async deleteSettings() {
        try {
            const created = await agent.Settings.delete(this.selectedSettings!.id);
            runInAction('deleting settings',() => {
                this.toggleShowForm();
                this.loadSettings();
            });
        } catch (e) {
            console.log(e);
            runInAction('error deleting setting',() => {
                this.toggleShowForm();
                this.loadSettings();
            });
        }

    }

}

export default createContext(new SettingsStore())
