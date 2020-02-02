import React, {useEffect, useState} from "react";
import {FiEdit} from "react-icons/fi";
import "./SettingsPageStyle.css"
import {ISettings} from "../../app/models/Settings";
import axios from "axios";
import SettingsForm from "./form/SettingsForm";

const SettingsPage = () => {
    const [settingsList, setSettingsList] = useState<ISettings[]>([]);
    const [selectedSettings, setSelectedSettings] = useState<ISettings>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formType, setFormType] = useState<string>('');

    useEffect(() => {
        axios.get<ISettings[]>('http://localhost:5000/api/settings')
            .then((response) => {
                console.log(response);
                setSettingsList(response.data);
                setSelectedSettings(response.data[0]);
            });
    }, []);

    const toggleShowForm = () => {
        setShowForm(!showForm)
    };

    return (
        <div className="cc-container">
            <div>
                {
                    showForm ?
                        (formType === "Add New") ?
                            <SettingsForm toggleShowForm={toggleShowForm} type={formType}/>
                            : <SettingsForm toggleShowForm={toggleShowForm} type={formType}
                                            settings={selectedSettings}/>
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
                            <div className="settings-page-list">
                                {settingsList.map((settings) => (
                                    <label
                                        key={settings.id}
                                        className={"cc-list-item-container " +
                                        (selectedSettings?.id === settings.id ? "cc-list-item-container-selected" : "cc-list-item-container-unselected")}>
                                        <input onClick={() => {
                                            setSelectedSettings(settings);
                                            console.log(selectedSettings);
                                        }} name="setting" type="radio"/>
                                        <div className="settings-page-list-item-content">
                                            <div className="settings-page-list-item-title">
                                                <div>{settings.name}</div>
                                            </div>
                                            <div className="settings-page-list-item-edit">
                                                <div
                                                    onClick={() => {
                                                        setShowForm(true);
                                                        setFormType("Edit");
                                                    }}
                                                    className={"cc-btn cc-fab-btn cc-warning-btn " +
                                                    (selectedSettings?.id === settings.id ? "" : "settings-page-fab-unselected")}>
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
                                    setShowForm(true);
                                    setFormType("Add New");
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
