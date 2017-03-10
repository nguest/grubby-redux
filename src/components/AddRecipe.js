import React from "react";
import { connect } from "react-redux";
import AddRecipeForm from "./AddRecipeForm";

import { addItem } from '../actions/items';

class AddRecipe extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	componentDidMount() {
    document.title = this.props.routeParams.id;
    
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
		  	<a href={'recipe/' + this.props.addItemSuccess.item.path} className="mdl-button mdl-js-button mdl-button--raised">
						Go To Recipe
				</a>
		  	<a href="/add-recipe" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						Add Another ?
				</a>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
