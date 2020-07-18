import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { unixTimeToString } from '../lib/utilFunctions';
import { deleteItem, removeItemSuccess } from '../actions/items';
import Modal from './ModalDialog';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      meal: {},
      loading: true,
      dialogShown: false,
      uid: null,
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.handleAuth(user);
      }
    });
  }

  componentDidMount() {
    document.title = 'Recipe loading...';

    const meals = Object.keys(this.props.items).map((key) => this.props.items[key]);
    console.log(meals);
    const meal = meals.find((x) => x.path === this.props.routeParams.id);

    this.setState({
      meal,
      id: this.props.routeParams.id,
      loading: false,
      dialogShown: false,
    });

    if (meal) document.title = meal.title;
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(newProps.items) !== JSON.stringify(this.props.items)) {
      const meals = Object.keys(newProps.items).map((key) => newProps.items[key]);
      const meal = meals.find((x) => x.path === this.props.routeParams.id);
      this.setState({
        meal,
      });
      document.title = meal.title;
    }
  }

  componentWillUnmount() {
    this.props.clearProps();
  }

  authenticate = (provider) => {
    firebase.auth().signInWithPopup(provider)
      .then(this.handleAuth)
      .catch((error) => {
        console.log('error authenticating', error); // / TODO - obviously add multiuser authenticate and proper error handling, separate module
      });
  }

  handleAuth = (authData) => {
    const user = authData.user || authData;

    if (user.email == 'nicholas.guest@gmail.com' && user.emailVerified) { // temporary
      this.setState({
        uid: user,
      });
    } else {
      console.log('unauth user');
    }
  }

  signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          uid: null,
        });
      })
      .catch((error) => {
        console.log('error signing out', error);
      });
  }

  deleteRecipe = () => {
    this.props.deleteItem(this.state.meal);
  }

  modalShow = () => {
    this.setState({ dialogShown: true });
  }

  modalCloseContinue = () => {
    this.deleteRecipe();
    this.setState({ dialogShown: false });
  }

  modalCloseCancel = () => {
    this.setState({ dialogShown: false });
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        </div>
      );
    }
    if (this.props.removeItemSuccess.status) {
      return (
        <div className="container">
          <h2>Deleted!</h2>
          <p>
            Recipe
            <strong>{this.props.removeItemSuccess.item.title}</strong>
            {' '}
            deleted successfully.
          </p>

          <Link to="/" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Go Home ?
          </Link>
        </div>
      );
    }
    if (!this.props.isLoading) {
      const { meal } = this.state;
      return (
        <div className="container">

          <h2 className="display--inline-block">{meal.title}</h2>

          { this.state.uid
            ? (
              <div className="edit-buttons">
                <Link className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored button--recipe-edit" to={`/edit/${meal.path}`}>
                  <i className="material-icons">mode_edit</i>
                </Link>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect  button--recipe-delete" onClick={this.modalShow}>
                  <i className="material-icons">delete_forever</i>
                </button>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent" onClick={this.signOut}>
                  <i className="material-icons">exit_to_app</i>
                </button>
              </div>
            )
            : (
              <div className="edit-buttons">
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => this.authenticate(new firebase.auth.GoogleAuthProvider())}>Login with Google to Edit</button>
              </div>
            )}
          <p>
            Last Updated:
            {unixTimeToString(meal.timeUpdated)}
          </p>
          <div className="mdl-chip" style={{ marginBottom: 16 }}>
            <span className="mdl-chip__text">{meal.cuisineType}</span>
          </div>
          { meal.recipeFile ? (
            <a href={decodeURI(meal.recipeFile.url)} className="display--block" target="_blank">
              { meal.recipeFile.type.substring(0, 5) == 'image'
                ? (<img src={meal.recipeFile.url} className="mdl-shadow--2dp" style={{ width: 200 }} />)
                : null}
              {
                meal.recipeFile.type == 'application/pdf'
                  ? (<embed src={meal.recipeFile.url} style={{ width: 500, height: 500 }} />)
                  : null
              }
            </a>
          )
            : null}
          { meal.bookName
            ? (
              <h4>
                <i className="material-icons">library_books</i>
                {' '}
                {meal.bookName}
                {' '}
                {meal.bookPageNo ? `p.${meal.bookPageNo}` : null }
              </h4>
            )
            : null}
          <br />
          { meal.webUrl
            ? (
              <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored display--inline-block" style={{ marginBottom: 16 }} href={meal.webUrl} target="_blank">
                Recipe
                {' '}
                <i className="material-icons">link</i>
              </a>
            )
            : null}
          { meal.notes
            ? <p dangerouslySetInnerHTML={{ __html: meal.notes }} className="recipe-notes" />
            : null}

          <img src={meal.imageUrl} style={{ width: 200 }} className="display--block mdl-shadow--2dp" />

          <Modal
            closeOnOuterClick={true}
            show={this.state.dialogShown}
            onClose={this.close}
            transitionSpeed={500}
          >
            <h4 className="mdl-dialog__title">Delete Item?</h4>
            <div className="mdl-dialog__content">
              <p>
                Are you sure you want to delete
                {' '}
                <strong>{meal.title}</strong>
                ?
                {' '}
                <br />
                This cannot be undone.
              </p>
            </div>
            <div className="mdl-dialog__actions">
              <button type="button" className="mdl-button close" onClick={this.modalCloseCancel}>Cancel</button>
              <button type="button" className="mdl-button mdl-button--raised mdl-button--accent" onClick={this.modalCloseContinue}>OK</button>
            </div>
          </Modal>
        </div>
      );
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

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteItem(id)),
  clearProps: () => dispatch(removeItemSuccess(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
