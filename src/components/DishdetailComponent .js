import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap'
import { Link } from "react-router-dom";
import { Control, LocalForm, Field, Errors } from 'react-redux-form';

import Loading from './LoadingComponent'
import { baseUrl } from '../shared/BaseUrl';

function RenderDish({ dish }) {

    if (dish != null)
        return (
            <div>
                <Card key={dish.id}>
                    <CardImg top src={ baseUrl + dish.image} alt={dish.name} />
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


function RenderComments({comments, postComment, dishId}){
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
        <CommentForm dishId={dishId} postComment={postComment}/>
    </>)
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm() {
        this.setState({ isFormOpen: !this.state.isFormOpen })
    }

    //react-redux-form
    handleSubmit(values) {

        this.toggleForm();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (<>
            <Button outline onClick={this.toggleForm} ><span className='fa fa-pencil'>Submit Comment</span></Button>

            <Modal toggle={this.toggleForm} isOpen={this.state.isFormOpen}>
                <ModalHeader toggle={this.toggleForm}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                        <Row className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Field model=".rating" id="rating" name="rating" className="form-control auto">
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </Field>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors className="text-danger" model=".name" show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }} />
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment">comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6" className='form-control'
                            />
                        </Row>

                        <Row className="form-group">
                            <Col md={{ size: 10 }}>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
        )

    }
}



const DishDetail = (props) => {
    //const { dish, comments } = props;
    if(props.isLoading){
        return(
            <div className='container'>
               <div className='row'>
                  <Loading />
               </div>
            </div>
        );
    }
    else if( props.errMess){
        return(
            <div className='container'>
               <div className='row'>
                  <h4>{props.errMess}</h4>
               </div>
            </div>
        );
    }
    else if (props.dish != null) 

        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1"> <RenderDish dish={props.dish} /></div>
                    <div className="col-12 col-md-5 m-1"> 
                        <RenderComments comments={props.comments} 
                          postComment={props.postComment}
                          dishId={props.dish.id}
                        />
                        
                    </div>
                </div>
            </div>
        )
     else {
        return <div></div>
    }
}
export default DishDetail;






