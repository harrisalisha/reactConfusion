import React, { Component } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, List
} from 'reactstrap';

import {comments} from '../shared/dishes'


export default class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    //dish = this.props.selectedDish;
    
    renderDish(dish) {
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

    RenderComments = (comments)=> {
        if(comments)
        return (
           <div>
           <h4>Comments</h4>
           {comments.map((comment) => { return <ul className="list-unstyled"><li key={comment.id}>{comment.comment}</li>
           <p>--{comment.author} {comment.date}</p>
           </ul>
       })}   
       </div>
        )
        else{
            return <div></div>
        }
     
   }

    render() {
        const dish = this.props.selectedDish;
        
     return (
         <>  
            <div className="col-12 col-md-5 m-1">  { this.renderDish(dish)}</div> 
            <div className="col-12 col-md-5 m-1">  {this.RenderComments(comments)}</div> 
         </>
     )
    }
}
