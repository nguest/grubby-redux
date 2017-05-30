import React from "react";
import { Link } from 'react-router'
import { connect } from "react-redux";

import "../stylesheets/main.scss";

import { itemsFetchData } from '../actions/items';


// app component
class App extends React.Component {

	componentWillMount() {
    // on load, get the firebase data
    this.props.fetchData()
  }
  // render
  render() {
	  const isActive = this.props.location.pathname;
		const menuItems = [
			{ text: 'Home', path: '/'},
			{ text: 'Add', path: '/add-recipe'},
		];
	  
    return (

	    <div  className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
		    <header className="mdl-layout__header" style={{backgroundImage: 'url(//' + window.location.hostname + ':'+ window.location.port + '/assets/header-bg.jpg)'}} >
		    	<div className="mdl-layout__header-row">
		    		<Link to="/">
		    			<img src={'//' + window.location.hostname + ':'+ window.location.port + '/assets/logo.svg'}/>
		    		</Link>
		    	</div>
		    	<div className="mdl-layout__tab-bar mdl-js-ripple-effect">
		    		{ menuItems.map(menuItem => {
			    		const isActive = (this.props.location.pathname === menuItem.path) ? 'is-active' : '';
			    		return (<Link to={menuItem.path} key={menuItem.text} className={"mdl-layout__tab " + isActive}>{menuItem.text}</Link>)	
			      })}
          </div>
		    </header>
		    <div className="mdl-layout__drawer">
			    <span className="mdl-layout-title">Menu</span>
			    <nav className="mdl-navigation">
						{ menuItems.map(menuItem => {
			    		const isActive = (this.props.location.pathname === menuItem.path) ? 'is-active' : '';
			    		return (<Link to={menuItem.path} key={menuItem.text} className={"mdl-navigation__link " + isActive}>{menuItem.text}</Link>)	
			      })}

			    </nav>
			  </div>
		    <main className="mdl-layout__content">
		    	{this.props.children}
				</main>
	    </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
		items: state.items,
		hasErrored: state.itemsHasErrored,
		isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(itemsFetchData()),
    itemToEdit: (item) => dispatch(itemToEdit(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);