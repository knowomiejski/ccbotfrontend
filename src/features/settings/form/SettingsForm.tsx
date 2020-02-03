import React, {ChangeEvent, useState} from 'react';
import '../SettingsPageStyle.css'
import './SettingsFormStyle.css'
import {ISettings} from '../../../app/models/Settings';

interface IProps {
    toggleShowForm: () => void,
    type: string,
    settings?: ISettings
}


const SettingsForm: React.FC<IProps> = ({toggleShowForm, type, settings: selectedSettings}) => {

    const initializeForm = () => {
        if(selectedSettings) {
            return selectedSettings
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
        const { name, value} = event.target;
        setNewSettings({...newSettings, [name]: value})
    };

    const handleSubmit = () => {
        toggleShowForm();
        console.log(newSettings)
    };

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
                                    <input name="name" onChange={handleInputChange} defaultValue={newSettings.name} className="cc-input" inputMode="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Prefix</label>
                                    <input name="prefix" onChange={handleInputChange} defaultValue={newSettings.prefix} className="cc-input" inputMode="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Reminder timer (in seconds)</label>
                                    <input name="reminderTimer" onChange={handleInputChange} defaultValue={newSettings.reminderTimer} className="cc-input" type="number"
                                           inputMode="numeric"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Google Docs Folder ID</label>
                                    <input name="folderID" onChange={handleInputChange} defaultValue={newSettings.folderId} className="cc-input" inputMode="text"/>
                                </div>

                                <div className="settings-form-btn-container">
                                    <div onClick={toggleShowForm} className="cc-btn cc-danger-btn">
                                        <div className="cc-btn-content">Delete</div>
                                    </div>
                                    <div onClick={toggleShowForm} className="cc-btn">
                                        <div className="cc-btn-content">Back</div>
                                    </div>
                                    <div onClick={()=>{handleSubmit();}} className="cc-btn cc-sucess-btn">
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
