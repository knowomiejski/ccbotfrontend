import React, {useState} from 'react';
import '../SettingsPageStyle.css'
import './SettingsFormStyle.css'
import {ISettings} from '../../../app/models/Settings';

interface IProps {
    toggleShowForm: () => void,
    type: string,
    settings?: ISettings
}


const SettingsForm: React.FC<IProps> = ({toggleShowForm, type, settings}) => {


    return (
        <div className="cc-modal">
            <div className="cc-container">
                <div className="settings-form-container">
                    <div className="cc-card settings-form-card">
                        <div className="cc-card-content">
                            <div>
                                <div className="cc-card-title">
                                    {type} Settings
                                </div>

                                <div className="cc-input-container">
                                    <label className="cc-label">Name</label>
                                    <input defaultValue={settings?.name} className="cc-input" inputMode="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Prefix</label>
                                    <input defaultValue={settings?.prefix} className="cc-input" inputMode="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Reminder timer (in seconds)</label>
                                    <input defaultValue={settings?.reminderTimer} className="cc-input" type="number"
                                           inputMode="numeric"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Google Docs Folder ID</label>
                                    <input defaultValue={settings?.folderId} className="cc-input" inputMode="text"/>
                                </div>

                                <div className="settings-form-btn-container">
                                    <div onClick={toggleShowForm} className="cc-btn cc-danger-btn">
                                        <div className="cc-btn-content">Delete</div>
                                    </div>
                                    <div onClick={toggleShowForm} className="cc-btn">
                                        <div className="cc-btn-content">Back</div>
                                    </div>
                                    <div onClick={toggleShowForm} className="cc-btn cc-sucess-btn">
                                        <div className="cc-btn-content">Save</div>
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

export default SettingsForm;
