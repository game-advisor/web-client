import {useContext, useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";

import APIService from "../../api/APIService";

import {FormattedDate, FormattedTime} from "react-intl";
import {Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import authContext from "../../store/AuthContext";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

function ReviewListItem(props) {
    const authCtx = useContext(authContext);

    return (
        <div className="d-flex w-100 mb-3">
            <div className="d-flex flex-column me-2">
            <img
                alt=""
                src={`${process.env.REACT_APP_API_URL}/user/${props.author.userID}/avatar`}
                width="48"
                height="48"
                className="user-avatar rounded shadow"
            />
                {props.author.userID === authCtx.details.userID ?
                    <>
                    <Button as={Link} to={`/games/${props.game.gameID}/reviews/${props.id}/edit`}
                            variant="outline-secondary" className="w-100 mt-2"><PencilIcon width="16" height="16" /></Button>
                    <Button variant="outline-danger"  className="w-100 mt-2"
                            onClick={() => props.onDelete(props.id)} ><TrashIcon width="20" height="20" /></Button>
                    </> : ''
                }
            </div>
            <Card body className="flex-fill">
                <Card.Title>
                    <Link to={`/users/${props.author.userID}`} className="text-reset text-decoration-none">{props.author.username}</Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {props.game.name}&nbsp;&bull;&nbsp;
                    <FormattedDate value={props.date} day="2-digit" month="short" year="numeric"/>&nbsp;
                    <FormattedTime value={props.date} hour="numeric" minute="numeric" hour12={false} />
                </Card.Subtitle>
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