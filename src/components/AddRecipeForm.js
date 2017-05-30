import React from "react";
import { connect } from "react-redux";
import cuisineTypes from "../cuisineTypes.json";
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';


class AddRecipeForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
    this.handleInitialize();
  }
  
  handleInitialize = () => {
	   this.props.initialize(this.props.mealToEdit);
  }
  
  // TODO: add form validation

  render() {
    const { handleSubmit, load, pristine, submitting } = this.props;
    
	  return (
		  	<form onSubmit={handleSubmit}>
	        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<Field className="mdl-textfield__input" component="input" type="text" name="title" required/>
						<label className="mdl-textfield__label" htmlFor="title">Full recipe title</label>						
					</div>
					<div>
						<label className="" htmlFor="cuisineType">Cuisine Type</label>
						<div className ="select-container">
							<Field name="cuisineType" component="select" required>
								<option></option>
								{ cuisineTypes.map((type) =>
								<option value={type} key={type}>{type}</option>
								)}
							</Field>
						</div>
					</div>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<Field className="mdl-textfield__input" component="input" type="text" name="bookName"/>
						<label className="mdl-textfield__label" htmlFor="bookName">Cookbook name</label>
					</div>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<Field className="mdl-textfield__input" component="input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" name="bookPageNo"/>
						<label className="mdl-textfield__label" htmlFor="bookPageNo">Page No.</label>
						<span className="mdl-textfield__error">Input is not a number!</span>
					</div>
					<div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label">
						<Field className="mdl-textfield__input" component="input" type="text" name="webUrl"/>
						<label className="mdl-textfield__label" htmlFor="webUrl">Web URL</label>
					</div>
					<div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label">
						<Field className="mdl-textfield__input" component="input" type="text" name="imageUrl"/>
						<label className="mdl-textfield__label" htmlFor="imageUrl">Image URL</label>
					</div>
					<div>
						<label className="mdl__label" htmlFor="recipeFile">Recipe File</label>
						<Field
		            name="recipeFile"
		            component={renderDropzoneInput}
		          />
	        </div>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						<Field className="mdl-textfield__input" component="textarea" rows= "5" name="notes" ></Field>
						<label className="mdl-textfield__label" htmlFor="notes">Notes...</label>
					</div>
					<Field name="id" component="input" type="text" hidden/>
					<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" disabled={pristine || submitting}>
						{ this.props.mealToEdit ? 'Save Changes' : 'Add Recipe' }
					</button>

				</form>
		)
	}
}

AddRecipeForm = reduxForm({
  form: 'AddRecipe' // unique name for the form
})(AddRecipeForm);

function mapStateToProps(state) {
  return {
	  initialValues: {},
  };
}


AddRecipeForm = connect(mapStateToProps)(AddRecipeForm)

export default AddRecipeForm;


const renderDropzoneInput = (field) => {
  const files = field.input.value;
  const dropZoneStyle = {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	  padding: 10,
	  borderColor: '#d50000', 
	  borderStyle: 'dashed', 
	  borderWidth: 3,
	  width: '100%',
	  maxWidth: 474,
	  height: 100
  }
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        style={dropZoneStyle}
      >
        <div>Drop a recipe file here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}