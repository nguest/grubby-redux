import React from "react";
import { Link } from 'react-router'
import { connect } from "react-redux";
import cuisineTypes from "../cuisineTypes.json";


class MealsList extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			inputValue: '',
			queryResult: Object.keys(this.props.items).map(key => this.props.items[key]), //make an array from the JSON
			viewableCuisineTypes: cuisineTypes
		}
  }
  
  componentDidMount() {

  }
  
  componentWillReceiveProps(newProps) {
	  if (newProps.items != this.props.items ) {
		  this.setState({ 
	    	queryResult:  this.sortByProperty(Object.keys(newProps.items).map(key => newProps.items[key]), 'title')
 			})
	  }
  }
  
  sortByProperty = (items, property) => {
	  return items.sort(function(a, b) {
			var nameA = a[property].toUpperCase();
			var nameB = b[property].toUpperCase();
		  if (nameA < nameB) {
		    return -1;
		  }
		  if (nameA > nameB) {
		    return 1;
		  }
  		return 0;
		});
  }
    
  handleInputChange = (e) => {
		
		//magic ES6 to get array from obj.
		let meals = Object.keys(this.props.items).map(key => this.props.items[key]);
	
		let queryResult = [];

		meals.forEach((meal) => {
      if (meal.title.toLowerCase().indexOf(e.target.value.toLowerCase())!=-1)
        queryResult.push(meal);
    });
    this.setState({ 
	    queryResult : this.sortByProperty(queryResult,'title'), 
	    inputValue: e.target.value
 		})
	}
	
		
	handleCuisineChange = (value) => {
		
		let meals = Object.keys(this.props.items).map(key => this.props.items[key]);

		let queryResult = [];
		
		
		meals.forEach((meal) => {
      if (meal.cuisineType === value)
        queryResult.push(meal);
    });
    
    let viewableCuisineTypes = []

    if (this.state.viewableCuisineTypes.length == 1) {
	    viewableCuisineTypes = cuisineTypes,
	    queryResult = meals
	    console.log('value',queryResult)

    } else {
	    viewableCuisineTypes = [value]
    }

    this.setState({ 
	    queryResult: this.sortByProperty(queryResult,'title'), 
	    inputValue: '',
	    viewableCuisineTypes: viewableCuisineTypes
 		})
		
	}

	render() {

		if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return (
        <div className="container pointer-events--none">
      		<div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active pointer-events--none"></div>
				</div>
			)
    }	else {
      return (
	      <div>
		      <div className="container-flow align-items--center">
						<div className="mdl-textfield mdl-js-textfield">
					    <label className="search-icon">
					      <i className="material-icons">search</i>
					    </label>
							<input className="mdl-textfield__input" type="text" value={this.state.inputValue} onChange={this.handleInputChange}
					placeholder="Enter Search Terms"/>
						</div>
						<div>
							{this.state.viewableCuisineTypes.map(cuisineType =>
							<button className="mdl-chip" key={cuisineType} onClick={(value) => this.handleCuisineChange(cuisineType)}>
								<span className="mdl-chip__text">{cuisineType}</span>
								{ (this.state.viewableCuisineTypes.length == 1) ?
								<span className="mdl-chip__action"><i className="material-icons">cancel</i></span> :
								null
								}
							</button>
							)}
						</div>

	        </div>
	        <div className="container">
	          <p><span className="mdl-number">{this.state.queryResult.length}</span> recipes shown.</p>
					</div>

          <div className="container-flow">
 
	          { this.state.queryResult.map((meal) => (
	            
							<div className="mdl-card mdl-shadow--4dp"  key={meal.id}>
								<div className={'mdl-card__title'} style={{backgroundImage: `url('${meal.imageUrl}')`}}>
									<h3 className="mdl-card__title-text">{meal.title}</h3>
								</div>
								<div className="mdl-card__supporting-text">
									<span className="mdl-chip" onClick={(value) => this.handleCuisineChange(meal.cuisineType)}>
										<span className="mdl-chip__text">{meal.cuisineType}</span>
									</span>
								</div>
							
							  <div className="mdl-card__actions mdl-card--border">
							    <Link to={'/recipe/'+meal.path} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
							      See Recipe
							    </Link>
							  </div>
							</div>
	
	          ))}
	          { (this.state.queryResult.length == 0) ? 
		          <p>No {this.state.viewableCuisineTypes[0]} results found, sadly!</p> :
		          null
	          }
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
		isLoading: state.itemsIsLoading,
		hasErrored: state.itemsHasErrored,
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  };
}
export default connect(mapStateToProps)(MealsList);

