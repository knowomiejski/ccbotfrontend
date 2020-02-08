import React, {useContext, useEffect} from 'react';
import './styles.css';
import SelectSettingsPage from "../../features/selectsettings/SelectSettingsPage";
import {Route, Switch} from 'react-router-dom';
import LoginPage from "../../features/login/LoginPage";
import SelectBotPage from "../../features/selectbot/SelectBotPage";
import NotFound from "./shared/NotFound";
import {ToastContainer} from "react-toastify";
import QuestionsBotPage from "../../features/questionsbot/QuestionsBotPage";
import {RootStoreContext} from "../stores/rootStore";
import {observer} from "mobx-react-lite";
import Loader from "./shared/Loader";
import NotLoggedIn from "./shared/NotLoggedIn";
import DashboardPage from "../../features/dashboard/DashboardPage";

const App = () => {
    const rootStore = useContext(RootStoreContext);

    console.log(rootStore.userStore.user);
    useEffect(() => {
        if (rootStore.sharedStore.token) rootStore.userStore.getUser()
            .finally(() => {
                console.log('checking logged in: ', rootStore.userStore.isLoggedIn);
                rootStore.sharedStore.setApploaded();
            });
        else {
            rootStore.sharedStore.setApploaded();
        }

    }, [rootStore.sharedStore, rootStore.userStore]);

    if (!rootStore.sharedStore.appLoaded) return <div
        style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><Loader
        size={'large'}/></div>

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
            />
                {
                    rootStore.userStore.isLoggedIn ?
                        <div>
                            <Switch>
                                <Route exact path='/' component={DashboardPage}/>
                                <Route path='/qbot' component={QuestionsBotPage}/>
                                <Route path='/selectbot' component={SelectBotPage}/>
                                <Route path='/settings' component={SelectSettingsPage}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div> :
                        <div>
                            <Switch>
                                <Route exact path='/' component={LoginPage}/>
                                <Route component={NotLoggedIn}/>
                            </Switch>
                        </div>
                }
        </div>
    );
};

export default observer(App);
