import React from "react";
import { connect } from "react-redux";


class MealsFilter extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
	    inputValue: ''
    }
  }
  
  handleInputChange = (e) => {
		
		let queryResult=[];

		this.props.items.forEach((meal) => {
      if (meal.title.toLowerCase().indexOf(e.target.value.toLowerCase())!=-1)
        queryResult.push(meal);
    });
    this.setState({ 
	    queryResult, 
	    inputValue: e.target.value
 		})
	}


	render() {
    return (
        <div className="container-flow">
					<div className="mdl-textfield mdl-js-textfield">
						<input className="mdl-textfield__input" type="text" value={this.state.inputValue} onChange={this.handleInputChange}
				placeholder="Enter Search Terms"/>
					</div>
        </div>
    );   
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,

    // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
    // react-router-redux wants you to get the url data by passing the props through a million components instead of
    // reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
  };
}
export default connect(mapStateToProps)(MealsFilter);

