import React from "react";
import { connect } from "react-redux";

import "../stylesheets/main.scss";

import { itemsFetchData } from '../actions/items';


// app component
class App extends React.Component {

	componentWillMount() {
    // the first time we load the app, we need that users list
    this.props.fetchData('./data.json')
  }
  // render
  render() {
	  const isActive = this.props.location.pathname;
		const menuItems = [
			{ text: 'Home', path: '/'},
			{ text: 'Add', path: '/add-recipe'},
			{ text: 'Tab3', path: '/tab-3'}	
		];
	  
    return (
	    <div  className="mdl-layout mdl-js-layout">
		    <header className="mdl-layout__header" style={{backgroundImage: 'url(//' + window.location.hostname + ':'+ window.location.port + '/assets/header-bg.jpg)'}} >
		    	<div className="mdl-layout__header-row">
		    		<a href="/">
		    			<img src={'//' + window.location.hostname + ':'+ window.location.port + '/assets/logo.svg'}/>
		    		</a>
		    	</div>
		    	<div className="mdl-layout__tab-bar mdl-js-ripple-effect">
		    		{ menuItems.map(menuItem => {
			    		const isActive = (this.props.location.pathname === menuItem.path) ? 'is-active' : '';
			    		return (<a href={menuItem.path} key={menuItem.text} className={"mdl-layout__tab " + isActive}>{menuItem.text}</a>)	
			      })}
          </div>
		    </header>
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
    fetchData: (url) => dispatch(itemsFetchData(url)),
    itemToEdit: (item) => dispatch(itemToEdit(item))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);