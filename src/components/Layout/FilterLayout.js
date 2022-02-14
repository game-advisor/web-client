import {Fragment} from "react";

import FilterHeader from "./MainLayout/FilterHeader";

function FilterLayout(props) {
    return (
        <Fragment>
            <FilterHeader />
            {props.children}
        </Fragment>
    );
}

export default FilterLayout;