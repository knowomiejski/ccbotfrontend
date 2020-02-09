import React, {ChangeEvent, useContext, useState} from 'react';
import '../SelectSettingsPageStyle.css'
import './SelectSettingsFormStyle.css'
import {ISettings} from '../../../app/models/Settings';
import Loader from "../../../app/layout/shared/Loader";
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from "../../../app/stores/rootStore";

const SelectSettingsQbotForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {settingsStore} = rootStore;

    const initializeForm = () => {
        if (settingsStore.selectedSettings) {
            return settingsStore.selectedSettings
        } else {
            return {
                id: '',
                name: '',
                prefix: '',
                reminderTimer: 0,
                folderId: ''
            }
        }
    };
    const [newSettings, setNewSettings] = useState<ISettings>(initializeForm);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, type} = event.target;
        let value: string | number = event.target.value;
        if (type === 'number') {
            console.log(name);
            if (value === '') {
                value = 0
            } else {
                value = parseInt(value, 10);
            }
        }
        setNewSettings({...newSettings, [name]: value})
    };

    return (
        <div className="cc-modal">
            <div className="cc-container">
                <div className="select-settings-form-container">
                    <div className="cc-card select-settings-form-card">
                        <form className="cc-card-content">
                            <div>
                                <div className="cc-card-title">
                                    {settingsStore.formType} Settings
                                </div>

                                <div className="cc-input-container">
                                    <label className="cc-label">Name</label>
                                    <input name="name" onChange={handleInputChange} defaultValue={newSettings.name}
                                           className="cc-input" inputMode="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Prefix</label>
                                    <input name="prefix" onChange={handleInputChange} defaultValue={newSettings.prefix}
                                           className="cc-input" inputMode="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Reminder timer (in seconds)</label>
                                    <input name="reminderTimer" onChange={handleInputChange}
                                           defaultValue={newSettings.reminderTimer} className="cc-input" type="number"
                                           inputMode="numeric"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Google Docs Folder ID</label>
                                    <input name="folderId" onChange={handleInputChange}
                                           defaultValue={newSettings.folderId} className="cc-input" inputMode="text"/>
                                </div>
                                {
                                    settingsStore.loadingSettingsForm ?
                                        <div className="select-settings-form-btn-container">
                                            <Loader size='smol'/>
                                        </div>
                                        :
                                        <div className="select-settings-form-btn-container">
                                            {settingsStore.formType === "Add New" ?
                                                <div style={{display: "none"}}></div> :
                                                <div onClick={() => {
                                                    settingsStore.deleteSettings();
                                                }} className="cc-btn cc-danger-btn select-settings-form-btn">
                                                    <div className="cc-btn-content">Delete</div>
                                                </div>}
                                            <div onClick={() => {
                                                settingsStore.toggleShowForm()
                                            }} className="cc-btn select-settings-form-btn">
                                                <div className="cc-btn-content">Back</div>
                                            </div>
                                            <div onClick={() => {
                                                settingsStore.submitSettings(newSettings);
                                            }} className="cc-btn cc-sucess-btn select-settings-form-btn">
                                                <div className="cc-btn-content">Save</div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(SelectSettingsQbotForm);
