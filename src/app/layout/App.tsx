import React, {useContext, useState} from 'react';
import './styles.css';
import SettingsPage from "../../features/settings/SettingsPage";
import SettingsStore from "../stores/settings/settingsStore";

const App = () => {
    const settingsStore = useContext(SettingsStore);
    return (
        <div className="App">
            <SettingsPage/>
        </div>
    );
};

export default App;
