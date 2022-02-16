import {useEffect, useState} from "react";

import APIService from "../../api/APIService";
import * as formik from "formik";

import {Button, ButtonGroup, Form, Row} from "react-bootstrap";

function FilterForm(props) {
    const [availableTags, setAvailableTags] = useState([]);
    const [availablePublishers, setAvailablePublishers] = useState([]);

    const {Formik} = formik;
    const api = APIService();

    function fetchPublishers() {
        api.get('/company/getGameCompanies')
            .then((res) => setAvailablePublishers(res.data))
            .catch((err) => console.log(err.errors))
    }

    function fetchTags() {
        api.get('/tags')
            .then((res) => setAvailableTags(res.data))
            .catch((err) => console.log(err.errors))
    }

    useEffect(() => {
        fetchTags();
        fetchPublishers();
    }, []);

    return (
        <Formik
            onSubmit={(values) => props.onSubmit(values, availableTags)}
            initialValues={{
                tags: [],
                publishers: [],
            }}
        >
            {({
                  handleSubmit,
                  handleChange
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="tags" className="mb-3">
                        <h5 className="mb-3">Tags</h5>
                        <Row className="row-cols-3 row-cols-lg-6 g-2">
                            {availableTags.map((tag) => (
                                <Form.Switch
                                             id="tags"
                                             key={`${tag.name}`}
                                             label={`${tag.name}`}
                                             value={`${tag.name}`}
                                             onChange={handleChange}/>
                            ))}
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="tags" className="mb-3">
                        <h5 className="mb-3">Publishers</h5>
                        <Row className="row-cols-3 row-cols-lg-6 g-2">
                            {availablePublishers.map((publisher) => (
                                <Form.Switch
                                             id="publishers"
                                             key={`${publisher.name}`}
                                             label={`${publisher.name}`}
                                             value={`${publisher.companyID}`}
                                             onChange={handleChange}/>
                            ))}
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <hr/>
                        <ButtonGroup>
                            <Button variant="primary" type="submit">Apply filters</Button>
                            <Button variant="outline-secondary" type="reset">Clear all filters</Button>
                        </ButtonGroup>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
}

export default FilterForm;