import {useContext, useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";

import APIService from "../../api/APIService";

import {FormattedDate, FormattedTime} from "react-intl";
import {Card, Col, ProgressBar, Row} from "react-bootstrap";
import authContext from "../../store/AuthContext";

function ReviewListItem(props) {
    const [appState, setAppState] = useState({
        loaded: true,
        user: {},
        errors: null
    });

    const authCtx = useContext(authContext);
    const api = APIService();

    useEffect(() => {
        if (authCtx.getstatus()) {
            setAppState({loaded: false});

            api.get(`/user/${props.author}`)
                .then((res) => setAppState({
                    loaded: res.completed,
                    user: res.data,
                    errors: res.errors
                }))
                .catch((err) => setAppState({
                    loaded: err.completed,
                    user: err.data,
                    errors: err.errors
                }))
        }
    }, [props.author, authCtx]);

    return (
        <div className="d-flex w-100 mb-3">
            <img
                alt=""
                src={`${process.env.REACT_APP_API_URL}/user/${props.author}/avatar`}
                width="40"
                height="40"
                className="user-avatar rounded shadow me-2"
            />
            <Card body className="flex-fill">
                <Card.Title>{(appState.loaded && appState.user) ? <Link to={`/users/${props.author}`} className="text-reset text-decoration-none">{appState.user.username}</Link> : ''}</Card.Title>
                <Card.Subtitle className="mb-2"><FormattedDate value={props.date} day="2-digit" month="short" year="numeric"/> <FormattedTime value={props.date} hour="numeric" minute="numeric" /></Card.Subtitle>
                <Card.Text><ReactMarkdown>{props.content}</ReactMarkdown></Card.Text>
                <hr/>
                <Row className="row-cols-2">
                    <Col>
                        <div className="fw-bold">Average FPS</div>
                        <p className="mb-0"><span className="h1">{props.score.avgFPS}</span><span className="text-muted"> FPS</span></p>
                    </Col>
                    <Col>
                        <div className="fw-bold">Gameplay</div>
                        <p className="mb-0"><span className="h3">{props.score.gameplayRating}</span><span className="text-muted">/10</span></p>
                        <ProgressBar now={props.score.gameplayRating} max={10} className="mb-3" />
                    </Col>
                    <Col>
                        <div className="fw-bold">Graphics</div>
                        <p className="mb-0"><span className="h3">{props.score.graphicsRating}</span><span className="text-muted">/10</span></p>
                        <ProgressBar now={props.score.graphicsRating} max={10} className="mb-3" />
                    </Col>
                    <Col>
                        <div className="fw-bold">Music</div>
                        <p className="mb-0"><span className="h3">{props.score.musicRating}</span><span className="text-muted">/10</span></p>
                        <ProgressBar now={props.score.musicRating} max={10} className="mb-3" />
                    </Col>
                </Row>

            </Card>
        </div>
    );
}

export default ReviewListItem;