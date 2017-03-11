import React from "react";
import { connect } from "react-redux";
import MealsFilter from "./MealsFilter";
import MealsList from "./MealsList";

// Home page component
export default class Home extends React.Component {

  render() {
 	 	return (
	 	 	<MealsList/>
	 	)
	 }
}

