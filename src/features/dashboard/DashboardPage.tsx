import React, {useContext} from 'react';
import {FiFileText} from "react-icons/fi";
import Header from "../../app/layout/shared/Header";
import './DashboardPageStyle.css'
import {Link} from "react-router-dom";
import {RootStoreContext} from "../../app/stores/rootStore";

const DashboardPage = () => {
    const rootStore = useContext(RootStoreContext);

    return (
        <div>
            <Header/>
            <div className='cc-container'>
                <div className='cc-card'>
                    <div className='cc-card-content'>
                        <div className='cc-card-title'>
                            Dashboard
                        </div>
                        <div className='dashboard-page-subtitle-container'>
                            <div className='cc-card-subtitle'>
                                On this page you can choose the program you'd like to run.
                            </div>
                            <div className='cc-card-subtitle'>
                                Here's whats available right now :)
                            </div>
                        </div>
                        <div>
                            <div className='cc-card-subtitle'>
                                Currently running:
                            </div>
                            {rootStore.sharedStore.runningBots.length !== 0 ? rootStore.sharedStore.runningBots.map((bot) => (
                                <div key={bot.id} className='cc-card-subtitle'>{bot.nick}</div>
                            )) : <div className='cc-card-subtitle'>Nothing</div>}
                        </div>

                        <div className='dashboard-page-grid'>
                            <Link onClick={() => rootStore.sharedStore.setSelectedProgram('qbot')} to='/selectbot'
                                  className='dashboard-page-item cc-btn cc-primary-btn'>
                                <div className='dashboard-page-item-icon'>
                                    <FiFileText size={100}/>
                                </div>
                                <div className='dashboard-page-item-text-content'>
                                    <div className='dashboard-page-item-title'>
                                        Questions bot
                                    </div>
                                    <div className='dashboard-page-item-subtitle'>
                                        A bot that filters chat questions and adds them to a Google docs.
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
