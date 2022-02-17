import React, { Component } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, List
} from 'reactstrap'

function RenderDish({ dish }) {

    if (dish != null)
        return (
            <div>
                <Card key={dish.id}>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    else
        return (
            <div></div>
        );
}

const RenderComments = ({ comments }) => {
    return (<>
        <h4>Comments</h4>
        {comments.map((comment) => {
            return (
                <>
                    <li className='list-unstyled' key={comment.id} >{comment.comment}</li>
                    <p>{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                </>
            );
        })}
    </>)
}

const DishDetail = (props) => {
    const { dish } = props;

    if (dish) {
        const comments = dish.comments;
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1"> <RenderDish dish={props.dish} /></div>
                    <div className="col-12 col-md-5 m-1"> <RenderComments comments={comments} /></div>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}
export default DishDetail;