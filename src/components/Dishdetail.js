import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

const Dishdetail = ({ dish }) => {
    if (dish !== undefined) return <RenderDish dish={dish} />;
    return <div />;
};

export default Dishdetail;

const RenderDish = ({ dish }) => {
    return (
        <div key={dish.id} className="row">
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">{dish.comments.map((comment) => <RenderComment comment={comment} />)}</ul>
            </div>
        </div>
    );
};
const RenderComment = ({ comment }) => {
    return (
        <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
                -- {comment.author},{' '}
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                }).format(new Date(Date.parse(comment.date)))}
            </p>
        </li>
    );
};
