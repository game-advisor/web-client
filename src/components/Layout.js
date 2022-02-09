import AppNavbar from './Layout/AppNavbar';
import {Fragment} from "react";
import AppFooter from "./Layout/AppFooter";

import styles from './Layout.module.scss'

function Layout(props) {
    return (
        <Fragment>
            <AppNavbar />
            <main className={styles.main}>
                {props.children}
            </main>
            <AppFooter />
        </Fragment>
    );
}

export default Layout;