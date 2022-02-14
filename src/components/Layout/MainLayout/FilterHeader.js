import {Container} from "react-bootstrap";

import TagsCloud from "./TagsCloud";

function BrowseHeader() {
    return (
        <Container as="header" fluid className="bg-dark text-white mb-3">
            <Container className="py-5">
                <h1 className="text-center mb-3">Cannot find game you want to play?</h1>

                <p className="mt-5">Try to use filters below or check our suggestions:</p>
                <TagsCloud />
            </Container>
        </Container>
    );
}

export default BrowseHeader;