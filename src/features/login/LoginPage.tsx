import React from "react";
import "./LoginPageStyle.css"
import "../../app/layout/styles.css"

const LoginPage = () => {
    return (
        <div className="cc-container">
            <div className="login-page-container">
                <div className="login-page-main-title-container">
                    <div className="login-page-logo"></div>
                    <div className="login-page-title-text-container">
                        <div className="login-page-subtitle">
                            Maya Higa's
                        </div>
                        <div className="login-page-title">
                            Conservation Cast
                        </div>
                        <div className="login-page-title-desc">
                            Bot
                        </div>
                    </div>
                </div>
                <div className="cc-card login-page-card">
                    <div className="cc-card-content">
                        <div>
                            <div className="cc-card-title">
                                Login
                            </div>
                            <div className="login-page-input-container">
                                <div className="cc-input-container">
                                    <label className="cc-label">Username</label>
                                    <input id="username" className="cc-input" type="text"/>
                                </div>
                                <div className="cc-input-container">
                                    <label className="cc-label">Password</label>
                                    <input id="password" className="cc-input" type="password"/>
                                </div>
                            </div>
                        </div>
                        <div className="login-page-btn-container">
                            <div className="cc-btn cc-primary-btn">
                                <div className="cc-btn-content">
                                    Login
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
