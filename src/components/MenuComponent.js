import React from 'react'
import {
    Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
//import DishDetail from './DishdetailComponent ';

import { Link } from 'react-router-dom';

function RenderMenuItem({ dish, onClick }) {

    return (
        <Link to={`/menu/${dish.id}`}>
            <Card key={dish.id}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>

    )

}

const Menu = (props) => {
    const menu = props.dishes.map((dish) => {
        return (
            <div className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem> <Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Menu</BreadcrumbItem>   
            </Breadcrumb>

            <div className="col-12">
                <h3>Menu</h3>
                <hr />
            </div>       
            <div className="row">
                {menu}
            </div>
        </div>
    );

}

export default Menu;

