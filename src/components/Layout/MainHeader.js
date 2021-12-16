import {Container} from "react-bootstrap";

import MainSearch from "./MainHeader/MainSearch";
import TagsCloud from "./MainHeader/TagsCloud";

function MainHeader() {
    return (
        <Container fluid className="bg-dark text-white mb-3">
            <Container className="p-5 ">
                <h1 className="text-center">What game are you looking for?</h1>
                <MainSearch />

                <p className="mt-5">...don’t know what do you want to play? Check our suggestions:</p>
                <TagsCloud />
            </Container>
        </Container>
    );
}

export default MainHeader;