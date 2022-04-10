import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import firebase from 'firebase';

import AddRecipeForm from './AddRecipeForm';

import { addItem, addItemSuccess } from '../actions/items';

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      user: '',
      password: '',
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
    document.title = 'Add Recipe';
  }

  componentWillUnmount() {
    this.props.clearProps();
  }

  handleFormSubmit = (values) => {
    this.props.addItem(values, true);
  };

  renderLoginForm = () => (
    <div className="authForm">
      <input value={this.state.user} onChange={(e) => this.setState({ user: e.target.value })} />
      <br />
      <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" />
      <br />
      <button
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
        onClick={() => this.authenticate(new firebase.auth.GoogleAuthProvider())}
      >
        Login
      </button>
    </div>
  );

  authenticate = (provider) => {
    firebase.auth().signInWithEmailAndPassword(this.state.user, this.state.password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log({ u: userCredential.user });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ error });
      });
  };

  handleAuth = (authData) => {
    console.log({ authData });

    // const user = authData.email || authData;
    if (authData.email) {
      // temporary...
      this.setState({
        uid: authData.email,
      });
    } else {
      console.log('unauth user'); // TODO - obviously add multiuser authenticate and proper error handling
    }
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          uid: null,
        });
      })
      .catch((error) => {
        console.log('error signing out', error);
      });
  };

  render() {
    if (this.props.addItemSuccess.status) {
      return (
        <div className="container">
          <h2>Nice One!</h2>
          <p>
            New recipe
            <strong>
              {this.props.addItemSuccess.item.title}
              {' '}
            </strong>
            added successfully.
          </p>
          <Link
            to={`/recipe/${this.props.addItemSuccess.item.path}`}
            className="mdl-button mdl-js-button mdl-button--raised"
          >
            Go To Recipe
          </Link>
          <Link to="/add-recipe" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            Add Another ?
          </Link>
        </div>
      );
    }
    if (!this.state.uid) {
      return (
        <div className="container">
          <h2>Login to add a new recipe</h2>
          {this.renderLoginForm()}
        </div>
      );
    }
    return (
      <div className="container">
        <h2>Add a new recipe</h2>
        <p>
          {`Hello ${this.state.uid}!`}
        </p>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.signOut}>
          Log Out
        </button>
        <AddRecipeForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    addItemSuccess: state.addItemSuccess,
  };
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (newItem) => dispatch(addItem(newItem, true)),
  clearProps: () => dispatch(addItemSuccess(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
