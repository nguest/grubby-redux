import React from "react";
import { Link } from 'react-router'
import { connect } from "react-redux";
import AddRecipeForm from "./AddRecipeForm";

import { addItem } from '../actions/items';

class EditRecipe extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentWillMount() {
    document.title = this.props.routeParams.id;
/*
		const arr = Object.keys(this.props.items).map(key => this.props.items[key])

    const meal = {};
    const findMeal = (meal) => {
	    console.log('meal',meal)
	    return meal.path === this.props.routeParams.id;
    }
*/
		this.getMealToEdit();
    
  }
  
  getMealToEdit = () => {
		  const arr = Object.keys(this.props.items).map(key => this.props.items[key])
	
	    const findMeal = (meal) => {
		    return meal.path === this.props.routeParams.id;
	    }
	    const meal = arr.find(findMeal);
	    return meal;

  }
  
  handleFormSubmit = (values) => {
    console.log(values);
    this.props.addItem(values, false)
  }
	
  render() {

	  if (this.props.addItemSuccess.status) {
		  return (<div className="container">
		  	<h2>Nice One!</h2>
		  	<p>Recipe <strong>{this.props.addItemSuccess.item.title}</strong> edited successfully.</p>
		  	<Link to={'/recipe/' + this.props.addItemSuccess.item.path} className="mdl-button mdl-js-button mdl-button--raised">
						Go To Recipe
				</Link>
		  	<Link to="/" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						Home
				</Link>
			</div>)
	  }
	  if (this.props.items.length != 0) {
			const meal = this.getMealToEdit();

		  return (
			  <div className="container">
			  	<h2>Edit recipe</h2>
			  	<AddRecipeForm onSubmit={this.handleFormSubmit} mealToEdit={meal}/>
				</div>
			)
		} else {
			return (
				<div className="container">
      		<div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
  return {
    items: state.items,
    //itemToEdit: state.itemToEdit,
    addItemSuccess: state.addItemSuccess,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (newItem) => dispatch(addItem(newItem, false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
