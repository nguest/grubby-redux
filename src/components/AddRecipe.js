import React from "react";
import { Link } from 'react-router'
import { connect } from "react-redux";
import firebase from 'firebase';

import AddRecipeForm from "./AddRecipeForm";

import { addItem, addItemSuccess } from '../actions/items';

class AddRecipe extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			uid: ''
		}
	}
	
	componentWillMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.handleAuth(user);
			}
		})
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
	
	renderLoginForm = () => {
		return (
			<div className="authForm">
				<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => this.authenticate(new firebase.auth.GoogleAuthProvider())}>Login with Google</button>	
			</div>
		)
	}
	
	authenticate = (provider) => {
		firebase.auth().signInWithPopup(provider)
		.then(this.handleAuth)
		.catch((error) => {
			console.log('error authenticating', error) // TODO: display error
		});
	}
	
	handleAuth = (authData) => {
    let user = authData.user || authData
		if (user.email == 'nicholas.guest@gmail.com' && user.emailVerified) { // temporary...
			this.setState({
				uid: user
			})
		} else {
			console.log('unauth user') // TODO - obviously add multiuser authenticate and proper error handling
		}
	}
	
	signOut = () => {
		firebase.auth().signOut()
		.then(() => {
			this.setState({
				uid: null
			})
		})
		.catch((error) => {
			console.log('error signing out', error)
		});
	}
	
  render() {
	  if (this.props.addItemSuccess.status) {
		  return (<div className="container">
		  	<h2>Nice One!</h2>
		  	<p>New recipe  <strong>{this.props.addItemSuccess.item.title} </strong> added successfully.</p>
		  	<Link to={'/recipe/' + this.props.addItemSuccess.item.path} className="mdl-button mdl-js-button mdl-button--raised">
						Go To Recipe
				</Link>
		  	<Link to="/add-recipe" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						Add Another ?
				</Link>
			</div>)
	  }
	  if (!this.state.uid) {
		  return (
		  	<div className="container">
		  		<h2>Login to add a new recipe</h2>
		  		{this.renderLoginForm()}
				</div>
		  )
		}
	  return (
		  <div className="container">
		  	<h2>Add a new recipe</h2>
		  	<p>Hello {this.state.uid.displayName}!</p>
		  	<button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.signOut}>Log Out</button>
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
