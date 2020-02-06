import React, {useContext, useEffect} from 'react';
import './SelectBotPageStyle.css'
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Loader from "../../app/layout/Loader";
import Header from "../shared/Header";
import {RootStoreContext} from "../../app/stores/rootStore";

const SelectBotPage = () => {
    const rootStore = useContext(RootStoreContext);
    const {botStore} = rootStore;
    useEffect(() => {
        botStore.loadBotList();;
    }, [botStore]);

    return (
        <div>
            <Header/>
            <div className="cc-container">
                <div className="select-bot-page-container">
                    <div className="cc-card select-bot-page-card">
                        <div className='cc-card-content'>
                            <div className='cc-card-title'>
                                Choose Bot
                            </div>
                            {
                                botStore.loadingBotList ?
                                    <div className="select-bot-page-loader">
                                        <Loader size="medium"/>
                                    </div> :
                                    <div>
                                        <div className="select-bot-page-list">
                                            {
                                                botStore.botList.map((bot) => (
                                                    <label
                                                        key={bot.id}
                                                        className={"cc-list-item-container select-bot-page-list-item " +
                                                        (botStore.selectedBot?.id === bot.id ? "cc-list-item-container-selected" : "cc-list-item-container-unselected")}>
                                                        <input onClick={() => {
                                                            botStore.setSelectedBot(bot);
                                                            console.log(botStore.selectedBot);
                                                        }} name="bot" type="radio"/>
                                                        <div className="select-bot-page-list-item-content">
                                                            <div
                                                                className='select-bot-page-list-item-title'>{bot.nick}</div>
                                                            <hr style={{
                                                                border: "0.5px solid",
                                                                width: "100%",
                                                                boxSizing: "border-box"
                                                            }}/>
                                                            <div
                                                                className='select-bot-page-list-item-description'>{bot.description}</div>
                                                        </div>
                                                    </label>
                                                ))}
                                        </div>
                                        <div className="select-bot-page-btn-container">
                                            <div className="select-bot-page-control-btn-container">
                                                <Link className="cc-btn" to='/'>
                                                    <div className="cc-btn-content">
                                                        Back
                                                    </div>
                                                </Link>
                                                <Link className="cc-btn cc-primary-btn" to='/settings'>
                                                    <div className="cc-btn-content">
                                                        Next
                                                    </div>
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
    );
};

export default observer(SelectBotPage);
