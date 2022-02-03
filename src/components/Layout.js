import AppNavbar from './Layout/AppNavbar';
import {Fragment} from "react";

function Layout(props) {
    return (
        <Fragment>
            <AppNavbar />
            {props.children}
        </Fragment>
    );
}

export default Layout;