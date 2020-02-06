import React, {useContext} from "react";
import "./LoginPageStyle.css"
import "../../app/layout/styles.css"
import {observer} from "mobx-react-lite";
import {Field, Form} from 'react-final-form'
import {RootStoreContext} from "../../app/stores/rootStore";
import {IUserLoginFormValues} from "../../app/models/User";
import {combineValidators, composeValidators, isRequired, matchesPattern} from "revalidate";
import TextInput from "../shared/TextInput";


const validate = combineValidators({
    email: composeValidators(
        isRequired({message: 'Please fill in the email :)'}),
        matchesPattern(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/)({message: 'Please give a valid email :)'})
    )(),
    password: isRequired({message: 'Please fill out the password :)'})
});

const LoginPage = () => {
    const rootStore = useContext(RootStoreContext);
    const {userStore} = rootStore;

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
                    <Form
                        validate={validate}
                        onSubmit={(user: IUserLoginFormValues) => userStore.login(user)}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit} className="cc-card-content">
                                <div>
                                    <div className="cc-card-title">
                                        Login
                                    </div>
                                    <div className="login-page-input-container">
                                        <div className="cc-input-container">
                                            <label className="cc-label">Email</label>
                                            <Field
                                                name='email'                                                className="cc-input"
                                                type='text'
                                            >
                                                {props => (
                                                    <div>
                                                        <TextInput input={props.input} type={'text'} meta={props.meta}/>
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="cc-input-container">
                                            <label className="cc-label">Password</label>
                                            <Field
                                                id="password"
                                                name='password'
                                                className="cc-input"
                                                type="password"
                                                component='input'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="login-page-btn-container">
                                    <button className="cc-btn cc-primary-btn" type='submit'>
                                        <div className="cc-btn-content">
                                            Login
                                        </div>
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(LoginPage);
