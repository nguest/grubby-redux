import React from "react";
import { Link } from 'react-router'
import { connect } from "react-redux";
import AddRecipeForm from "./AddRecipeForm";

import { addItem, addItemSuccess } from '../actions/items';

class AddRecipe extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	componentDidMount() {
    document.title = 'Add Recipe';
    
  }
  componentWillUnmount() {
	  this.props.clearProps();
  }
  handleFormSubmit = (values) => {
    this.props.addItem(values, true)
  }
	
  render() {
	  console.log()
	  if (this.props.addItemSuccess.status) {
		  return (<div className="container">
		  	<h2>New One!</h2>
		  	<p>New recipe  <strong>{this.props.addItemSuccess.item.title} </strong> added successfully.</p>
		  	<Link to={'/recipe/' + this.props.addItemSuccess.item.path} className="mdl-button mdl-js-button mdl-button--raised">
						Go To Recipe
				</Link>
		  	<Link to="/add-recipe" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						Add Another ?
				</Link>
			</div>)
	  }
	  return (
		  <div className="container">
		  	<h2>Add a new recipe</h2>
		  	<AddRecipeForm onSubmit={this.handleFormSubmit}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    items: state.items,
    addItemSuccess: state.addItemSuccess,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (newItem) => dispatch(addItem(newItem, true)),
    clearProps: () => dispatch(addItemSuccess(null))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
