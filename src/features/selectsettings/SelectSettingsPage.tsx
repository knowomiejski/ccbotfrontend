import React, {useContext, useEffect} from "react";
import {FiEdit} from "react-icons/fi";
import "./SelectSettingsPageStyle.css"
import SettingsForm from "./form/SelectSettingsForm";
import Loader from "../../app/layout/Loader";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import Header from "../shared/Header";
import {RootStoreContext} from "../../app/stores/rootStore";

const SelectSettingsPage = () => {
    const rootStore = useContext(RootStoreContext);
    const {settingsStore} = rootStore;

    useEffect(() => {
        settingsStore.loadSettingsList();
    }, [settingsStore]);

    return (
        <div>
            <Header/>
            <div className="cc-container">
                <div>
                    {
                        settingsStore.showForm ?
                            <SettingsForm/>
                            : null
                    }
                </div>
                <div className="select-settings-page-container">
                    <div className="cc-card select-settings-page-card">
                        <div className="cc-card-content">
                            <div>
                                <div className="cc-card-title">
                                    Choose Settings
                                </div>
                                {
                                    settingsStore.loadingSettingsList ?
                                        <div className="select-settings-page-list-loading select-settings-page-loader">
                                            <Loader size="medium"/>
                                        </div> :
                                        <div>
                                            <div className="select-settings-page-list">
                                                {settingsStore.settingsList.map((settings) => (
                                                    <label
                                                        key={settings.id}
                                                        className={"cc-list-item-container " +
                                                        (settingsStore.selectedSettings?.id === settings.id ? "cc-list-item-container-selected" : "cc-list-item-container-unselected")}>
                                                        <input onClick={() => {
                                                            settingsStore.setSelectedSettings(settings);
                                                            console.log(settingsStore.selectedSettings);
                                                        }} name="setting" type="radio"/>
                                                        <div className="select-settings-page-list-item-content">
                                                            <div className="select-settings-page-list-item-title">
                                                                <div>{settings.name}</div>
                                                            </div>
                                                            <div className="select-settings-page-list-item-edit">
                                                                <div
                                                                    onClick={() => {
                                                                        settingsStore.setFormType("Edit");
                                                                        settingsStore.toggleShowForm();
                                                                    }}
                                                                    className={"cc-btn cc-fab-btn cc-warning-btn " +
                                                                    (settingsStore.selectedSettings?.id === settings.id ? "" : "select-settings-page-fab-unselected")}>
                                                                    <div className="cc-btn-content">
                                                                        <FiEdit/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            <div className="select-settings-page-btn-container">
                                                <div onClick={() => {
                                                    settingsStore.setFormType("Add New");
                                                    settingsStore.toggleShowForm();
                                                }} className="cc-btn cc-sucess-btn">
                                                    <div className="cc-btn-content">Add New Settings</div>
                                                </div>
                                                <div className="select-settings-page-control-btn-container">
                                                    <Link className="cc-btn" to='/bot'>
                                                        <div className="cc-btn-content">
                                                            Back
                                                        </div>
                                                    </Link>
                                                    <div className="cc-btn cc-primary-btn">
                                                        <div className="cc-btn-content">Next</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(SelectSettingsPage);
