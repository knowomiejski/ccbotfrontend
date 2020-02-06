import React from 'react';
import './styles.css';
import SelectSettingsPage from "../../features/selectsettings/SelectSettingsPage";
import {Route, Switch} from 'react-router-dom';
import LoginPage from "../../features/login/LoginPage";
import SelectBotPage from "../../features/selectbot/SelectBotPage";
import NotFound from "./NotFound";
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <div className="App">
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable={false}
                pauseOnHover
            /> <Switch>
            <Route exact path='/' component={LoginPage}/>
            <Route path='/bot' component={SelectBotPage}/>
            <Route path='/settings' component={SelectSettingsPage}/>
            <Route component={NotFound}/>
        </Switch>
        </div>
    );
};

export default App;
