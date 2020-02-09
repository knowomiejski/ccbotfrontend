import React, {useContext, useEffect} from "react";
import {FiEdit} from "react-icons/fi";
import "./SelectSettingsPageStyle.css"
import Loader from "../../app/layout/shared/Loader";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import Header from "../../app/layout/shared/Header";
import {RootStoreContext} from "../../app/stores/rootStore";
import SelectSettingsQbotForm from "./forms/SelectSettingsQbotForm";
import {history} from "../../index";
import {toast} from "react-toastify";

const SelectSettingsPage = () => {
    const rootStore = useContext(RootStoreContext);
    const {settingsStore, botStore, sharedStore} = rootStore;

    useEffect(() => {
        if (sharedStore.selectedProgram) {
            settingsStore.loadSettingsList();
        }  else {
            history.push('/');
            toast.error('Please select a program first :)');
        }
    }, [settingsStore, sharedStore.selectedProgram]);

    const openForm = (formType: string) => {
        settingsStore.setFormType(formType);
        settingsStore.toggleShowForm();
    };

    return (
        <div>
            <Header/>
            <div className="cc-container">
                <div>
                    {
                        settingsStore.showForm ?
                            botStore.selectedBot?.type === 'qbot' ?
                            <SelectSettingsQbotForm/> : null
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
                                                                        openForm('Edit');
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
                                                    openForm('Add New');
                                                }} className="cc-btn cc-sucess-btn">
                                                    <div className="cc-btn-content">Add New Settings</div>
                                                </div>
                                                <div className="select-settings-page-control-btn-container">
                                                    <Link className="cc-btn" to='/selectbot'>
                                                        <div className="cc-btn-content">
                                                            Back
                                                        </div>
                                                    </Link>
                                                    <Link onClick={() => rootStore.sharedStore.addRunningBot(rootStore.botStore.selectedBot!)} className="cc-btn cc-primary-btn" to='/'>
                                                        <div className="cc-btn-content">Start</div>
                                                    </Link>
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
