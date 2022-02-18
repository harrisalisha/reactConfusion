import React, { Component } from 'react'
import {
    Card, CardImg
  } from 'reactstrap';

const RenderSilly = ({item})=> {
    return (
        <Card>
            <CardImg alt="hello"  />
        </Card>
    )

}

export default function Silly(props){
  
    return (
      <div>
          <h1>Silly</h1>
          <div>{props.dishes.map((dish)=><li>{dish.name}</li>)}</div>
          <RenderSilly item={props.promotion} />
      </div>
    )
}
