import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createHistory } from 'history';
import { history } from './store.js';
import App from './components/App';
import Home from './components/Home';
import Recipe from './components/Recipe';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';

import NotFound from './components/NotFound';

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="recipe(/:id)" component={Recipe} />
      <Route path="add-recipe" component={AddRecipe} />
      <Route path="edit/:id" component={EditRecipe} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export { router };
