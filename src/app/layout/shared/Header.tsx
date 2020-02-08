import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../stores/rootStore";

const Header = () => {
    const rootStore = useContext(RootStoreContext);


    if (!rootStore.userStore.isLoggedIn) return <div>meme</div>;

    return (
        <div>
            placeholder title
            <div onClick={() => rootStore.userStore.logout()}>
                Logout
            </div>
        </div>
    );
};

export default observer(Header);
