import {Alert, Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import useAPI from "../../api/API";

function FilterForm(props) {
    const [availableTags, setAvailableTags] = useState([]);
    const [availablePublishers, setAvailablePublishers] = useState([]);

    function fetchPublishers() {
        api.get('/company/getGameCompanies')
            .then((response) => {
                setAvailablePublishers(response.data);
            })

            .catch((error) => console.log(error))
    }

    function fetchTags() {
        api.get('/tags')
            .then((response) => {
                setAvailableTags(response.data);
            })

            .catch((error) => console.log(error))
    }

    const api = useAPI();

    useEffect(() => {
        fetchTags();
        fetchPublishers();
    }, []);


    function handleSubmit() {

    }

    return (
        <Form onSubmit={handleSubmit}>
            {props.response ? <Alert variant="info mb-3">{props.response}</Alert> : ''}
            {props.errors ? <Alert
                variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert> : ''}

            <Row className="g-2">
                <Col xs>
                    <FloatingLabel id="tags" label="Tags">
                        <Form.Control as="select" multiple>
                            <option value="">Choose one</option>
                            {availableTags.map((option) => (<option key={option.name}>{option.name}</option>))}
                        </Form.Control>
                    </FloatingLabel>
                </Col>
                <Col xs>
                    <FloatingLabel id="publishers" label="Publishers">
                        <Form.Select multiple>
                            <option value="">Choose one</option>
                            {availablePublishers.map((option) => (<option key={option.companyID}>{option.name}</option>))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col className="d-grid ms-2">
                    <Button variant="primary" type="submit">Filter</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterForm;