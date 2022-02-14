import {useEffect, useState} from "react";

import useAPI from "../../api/API";
import * as formik from "formik";

import {Button, ButtonGroup, Form, Row} from "react-bootstrap";

function FilterForm(props) {
    const [availableTags, setAvailableTags] = useState([]);
    const [availablePublishers, setAvailablePublishers] = useState([]);

    const {Formik} = formik;
    const api = useAPI();

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

    useEffect(() => {
        fetchTags();
        fetchPublishers();
    }, []);

    return (
        <Formik
            onSubmit={(values) => props.onSubmit(values, availableTags, availablePublishers)}
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
                                             label={`${tag.name}`}
                                             value={`${tag.name}`}
                                             onChange={handleChange}/>
                            ))}
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="tags" className="mb-3">
                        <h5 className="mb-3">Tags</h5>
                        <Row className="row-cols-3 row-cols-lg-6 g-2">
                            {availablePublishers.map((publisher) => (
                                <Form.Switch
                                             id="publishers"
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