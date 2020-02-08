import React from 'react';
import '../styles.css'
import {Link} from "react-router-dom";
import Header from "./Header";

const NotLoggedIn = () => {
    return (
        <div>
            <Header/>
            <div className='cc-container'>
                <div
                    className='cc-card'
                    style={{margin: '200px auto', width: '600px'}}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        className='cc-card-content'
                    >
                        <div style={{width: '250px'}} className='cc-logo'></div>
                        <div className='cc-card-title'>
                            Please Log In :)
                        </div>
                        <Link to='/' className='cc-btn'>
                            <div className='cc-btn-content'>
                                Login
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotLoggedIn;
