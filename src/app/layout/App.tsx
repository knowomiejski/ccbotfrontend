import React, {useContext, useState} from 'react';
import './styles.css';
import SelectSettingsPage from "../../features/selectsettings/SelectSettingsPage";
import {Route} from 'react-router-dom';
import LoginPage from "../../features/login/LoginPage";
import SelectBotPage from "../../features/selectbot/SelectBotPage";

const App = () => {
    return (
        <div className="App">
            <Route exact path='/' component={LoginPage}/>
            <Route path='/bot' component={SelectBotPage}/>
            <Route path='/settings' component={SelectSettingsPage}/>
        </div>
    );
};

export default App;
