import {Alert, Row} from "react-bootstrap";
import ReviewListItem from "./ReviewListItem";

function ReviewList(props) {
    if (!props.reviews || props.reviews.length === 0) {
        if (props.errors)
            return (<Alert variant="danger">{props.errors.code ? `[${props.errors.code}] ${props.errors.message}` : `${props.errors.message}`}</Alert>);

        return (<p className="mt-5 h2 text-center text-muted">No reviews found.</p>)
    }

    return (
        <Row as="ul" className="list-unstyled">
            {props.reviews.map((review) => (
                <li key={review.reviewID}>
                    <ReviewListItem
                        id={review.reviewID}
                        author={review.reviewUserID}
                        date={review.dateCreated}
                        content={review.content}
                        score={review.score}
                    />
                </li>
            ))}
        </Row>
    );
}

export default ReviewList;