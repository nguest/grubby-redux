import React from "react";
import { connect } from "react-redux";
import { unixTimeToString } from '../lib/utilFunctions';
import { deleteItem } from '../actions/items';
import Modal, { closeStyle } from './ModalDialog';


class Recipe extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			meal: {},
			loading: true,
			dialogShown: false
		}
	}
	
	componentDidMount() {
    document.title = this.props.routeParams.id;
    
    const arr = Object.keys(this.props.items).map(key => this.props.items[key])

    const meal = {};
    const findMeal = (meal) => {
	    console.log('meal',meal)
	    return meal.path === this.props.routeParams.id;
    }
    
    console.log(this.props.items.find(findMeal));
    
    this.setState({
	    id: this.props.routeParams.id,
	    loading: false,
	    dialogShown: false
    })
  }
  
  componentWillReceiveProps(newProps) {
	  if (JSON.stringify(newProps.items) !== JSON.stringify(this.props.items)) {
		  const meals = Object.keys(newProps.items).map(key => newProps.items[key])
			let meal = meals.find((x)=>{
				return x.path === this.props.routeParams.id;
			})
			this.setState({
				meal
			})
	  }
  }

	deleteRecipe = () => {
		this.props.deleteItem(this.state.meal)
	}
	
	modalShow = () => {
    this.setState({dialogShown: true})
  }

  modalCloseContinue = () => {
		this.deleteRecipe();
    this.setState({dialogShown: false})
  }
  
  modalCloseCancel = () => {
	  console.log(this.state.meal.title)
    this.setState({dialogShown: false})
  }

  render() {
		if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return (
      	<div className="container">
      		<div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
				</div>
			)
    }
    if (this.props.removeItemSuccess.status) {
		  return (<div className="container">
		  	<h2>Deleted!</h2>
				<p>Recipe <strong>{'"' + this.props.removeItemSuccess.item.title + '"'}</strong> deleted successfully.</p>

		  	<a href="/" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						Go Home ?
				</a>
			</div>)
	  }
    if (!this.props.isLoading) {
			const meal = this.state.meal
      return (
	      <div className="container">
	      
	      	<h2 className="display--inline-block">{meal.title}</h2>
	      	<a className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored button--recipe-edit" href={'../edit/' + meal.path}>
						<i className="material-icons">mode_edit</i>
					</a>
					<button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect  button--recipe-delete" onClick={this.modalShow}>
						<i className="material-icons">delete_forever</i>
					</button>
					<p>Last Updated: {unixTimeToString(meal.timeUpdated)}</p>
					<div className="mdl-chip">
						<span className="mdl-chip__text">{meal.cuisineType}</span>
					</div>
					{ meal.recipeFileUrl ?
						<a href={meal.recipeFileUrl} className="display--block">
							<img src={meal.recipeFileUrl} style={{width:200}}/> 
						</a>	:
						null
					}
					{ meal.bookName ?
	      		<h4><i className="material-icons">library_books</i> {meal.bookName} {meal.bookPageNo ? 'p.'+ meal.bookPageNo : null }</h4> :
	      		null
	      	}
	      	{ meal.webUrl ?
		      	<a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored display--inlne-block" href={meal.webUrl} target="_blank">
							Recipe
						</a> :
						null
					}
					<p dangerouslySetInnerHTML={{__html: meal.notes}}></p>

	      	<img src={meal.imageUrl} style={{width:200}} className="display--block"/>
	      	
					<Modal
						closeOnOuterClick={true}
						show={this.state.dialogShown}
						onClose={this.close}
						transitionSpeed={500}>
						<h4 className="mdl-dialog__title">Delete Item?</h4>
						<div className="mdl-dialog__content">
				      <p>
				        Are you sure you want to delete <strong>{meal.title}</strong>? <br/>This cannot be undone.
				      </p>
				    </div>
					  <div className="mdl-dialog__actions">
							<button type="button" className="mdl-button close" onClick={this.modalCloseCancel}>Cancel</button>
							<button type="button" className="mdl-button mdl-button--raised mdl-button--accent" onClick={this.modalCloseContinue}>OK</button>
						</div>
					</Modal>
	      </div>
	    )
	  }
	}
}

function mapStateToProps(state) {
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    removeItemSuccess: state.removeItemSuccess,
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(deleteItem(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
