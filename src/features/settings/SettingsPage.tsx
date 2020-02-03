import React, {useContext, useEffect} from "react";
import {FiEdit} from "react-icons/fi";
import "./SettingsPageStyle.css"
import SettingsForm from "./form/SettingsForm";
import Loader from "../../app/layout/Loader";
import SettingsStore from "../../app/stores/settings/settingsStore";
import {observer} from "mobx-react-lite";

const SettingsPage = () => {
    const settingsStore = useContext(SettingsStore);

    useEffect(() => {
        getSettingsList();
    }, []);

    const getSettingsList = () => {
        settingsStore.loadSettings();
    };

    return (
        <div className="cc-container">
            <div>
                {
                    settingsStore.showForm ?
                        <SettingsForm/>
                        : null
                }
            </div>
            <div className="settings-page-container">
                <div>Title placeholder</div>
                <div className="cc-card settings-page-card">
                    <div className="cc-card-content">
                        <div>
                            <div className="cc-card-title">
                                Choose Settings
                            </div>
                            {settingsStore.loadingSettingsList ?
                                <div className="settings-page-list-loading settings-page-loader">
                                    <Loader size="medium"/>
                                </div> :
                                <div>
                                    <div className="settings-page-list">
                                        {settingsStore.settingsList.map((settings) => (
                                            <label
                                                key={settings.id}
                                                className={"cc-list-item-container " +
                                                (settingsStore.selectedSettings?.id === settings.id ? "cc-list-item-container-selected" : "cc-list-item-container-unselected")}>
                                                <input onClick={() => {
                                                    settingsStore.setSelectedSettings(settings);
                                                    console.log(settingsStore.selectedSettings);
                                                }} name="setting" type="radio"/>
                                                <div className="settings-page-list-item-content">
                                                    <div className="settings-page-list-item-title">
                                                        <div>{settings.name}</div>
                                                    </div>
                                                    <div className="settings-page-list-item-edit">
                                                        <div
                                                            onClick={() => {
                                                                settingsStore.setFormType("Edit");
                                                                settingsStore.toggleShowForm();
                                                            }}
                                                            className={"cc-btn cc-fab-btn cc-warning-btn " +
                                                            (settingsStore.selectedSettings?.id === settings.id ? "" : "settings-page-fab-unselected")}>
                                                            <div className="cc-btn-content">
                                                                <FiEdit/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="settings-page-btn-container">
                                        <div onClick={() => {
                                            settingsStore.setFormType("Add New");
                                            settingsStore.toggleShowForm();
                                        }} className="cc-btn cc-sucess-btn">
                                            <div className="cc-btn-content">Add New Settings</div>
                                        </div>
                                        <div className="settings-page-control-btn-container">
                                            <div className="cc-btn">
                                                <div className="cc-btn-content">Back</div>
                                            </div>
                                            <div className="cc-btn cc-primary-btn">
                                                <div className="cc-btn-content">Next</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(SettingsPage);
