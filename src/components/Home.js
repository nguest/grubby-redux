import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MealsList from './MealsList';

// Home page component
export default class Home extends PureComponent {
  render() {
    return (
      <MealsList />
    );
  }
}
