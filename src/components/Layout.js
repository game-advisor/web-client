import MainNavigation from './Layout/MainNavigation';

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            {props.children}
        </div>
    );
}

export default Layout;