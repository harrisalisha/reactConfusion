import React, { Component } from 'react'
import Menu from './MenuComponent'
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent ';
import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import {connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/actionCreator';

import { actions } from 'react-redux-form';

//state from redux become available as "props" in our components by connectting used connect()
 const mapStateToProps = (state) => {
   return {
     dishes: state.dishes,
     promotions: state.promotions,
     leaders: state.leaders,
     comments: state.comments
    }
  };

  //action become availabe as props , key : ()=> dispatch( actionfn())
  const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: ()=>{ dispatch(fetchDishes())},
    resetFeedbackForm : ()=> {dispatch(actions.reset('feedback'))}
    //feedback is key in configureStore for form
  });

//Main component responsible for all state
class Main extends Component {
  constructor(props){
    super(props);
  }
  
  //right after commponent just mount we call fetchDishes()thunk fn
  componentDidMount(){
      this.props.fetchDishes();
  }
 
  render() {
    const HomePage = () => {
      return( <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={this.props.dishes.isLoading}
      dishesErrMess={this.props.dishes.errMess}
      promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
      leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
          />
      );
    };
    
    return (
      <div>
        <Header />
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}
/***EXPLAINATION we extract comments ARRAY that match with Dish ID, NOT comment ID, 10 is base ten*/

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
