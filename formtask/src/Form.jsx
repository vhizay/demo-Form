import React from "react";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      passwordConfirmation: "",
      firstNameError: "",
      emailAddressError: "",
      passwordError: "",
      passwordConfirmationError: "",
      address: "",
      addressError:"",
      isFormSubmitted: false,
      company : "",
      companyError: "",
      city : "",
      cityError: "",
      states: "",
      stateError: "",
      print: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validateCompany = this.validateCompany.bind(this);
    this.validateEmailAddress = this.validateEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
    this.validateAddress = this.validateAddress.bind(this);
    this.validateState = this.validateState.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      setPrint : false,
      isFormSubmitted:false
    });

    return;
  }

  handleBlur(event) {
    const { name } = event.target;

    this.validateField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formFields = [
      "firstName",
      "lastName",
      "emailAddress",
      "password",
      "passwordConfirmation",
      "address",
      "company",
      "states",
      "city"
    ];
    let isValid = true;
    formFields.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) this.setState({ isFormSubmitted: true });
    else this.setState({ isFormSubmitted: false });

    return this.state.isFormSubmitted;
  }

  validateField(name) {
    let isValid = false;

    if (name === "firstName") isValid = this.validateFirstName();
    else if (name === "lastName") isValid = this.validateLastName();
    else if (name === "company") isValid = this.validateCompany();
    else if (name === "emailAddress") isValid = this.validateEmailAddress();
    else if (name === "password") isValid = this.validatePassword();
    else if (name === "address") isValid = this.validateAddress();
    else if (name === "city") isValid = this.validateCity();
    else if (name === "state") isValid = this.validateState();
    else if (name === "passwordConfirmation")
      isValid = this.validatePasswordConfirmation();
    return isValid;
  }

  validateFirstName() {
    let firstNameError = "";
    const value = this.state.firstName;
    if (value.trim() === "") firstNameError = "First Name is required";

    this.setState({
      firstNameError
    });
    return firstNameError === "";
  }

 
  validateLastName() {
    let lastNameError = "";
    const value = this.state.lastName;
    if (value.trim() === "") lastNameError = "Last Name is required";

    this.setState({
      lastNameError
    });
    return lastNameError === "";
  }
  validateCompany() {
    let companyError = "";
    const value = this.state.company;
    if (value.trim() === "") companyError = "company name is required";

    this.setState({
      companyError
    });
    return companyError === "";
  }

  validateEmailAddress() {
    let emailAddressError = "";
    const value = this.state.emailAddress;
    if (value.trim === "") emailAddressError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailAddressError = "Email is not valid";

    this.setState({
      emailAddressError
    });
    return emailAddressError === "";
  }

  validatePassword() {
    let passwordError = "";
    const value = this.state.password;
    if (value.trim === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

    this.setState({
      passwordError
    });
    return passwordError === "";
  }

  validatePasswordConfirmation() {
    let passwordConfirmationError = "";
    if (this.state.password !== this.state.passwordConfirmation)
      passwordConfirmationError = "Password does not match Confirmation";

    this.setState({
      passwordConfirmationError
    });
    return passwordConfirmationError === "";
  }

  validateAddress() {
    let addressError = "";
    const value = this.state.address;
    if (value.trim === "") addressError = "address is required";

    this.setState({
      addressError
    });
    return addressError === "";
  }
  validateCity() {
    let cityError = "";
    const value = this.state.city;
    if (value.trim() === "") cityError = "City Name is required";

    this.setState({
      cityError
    });
    return cityError === "";
  }
  validateState() {
    let stateError = "";
    const value = this.state.states;
    if (value.trim() === "") stateError = "state Name is required";

    this.setState({
      stateError
    });
    return stateError === "";
  }
  render() {
    return (
      <div className="main" >
        <h3>Sample contact Form</h3>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>state: {this.state.states}</div>
            <div>city: {this.state.city}</div>
            <div>Address: {this.state.address}</div>
            <div>Email Address: {this.state.emailAddress}</div>
          </div>
        ) : (
          <div >
          <form onSubmit={this.handleSubmit} >
              <label>First Name : </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.firstNameError && (
              <div className="errorMsg">{this.state.firstNameError}</div>
            )}
            <br/>
            <label>Last Name : </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.lastNameError && (
              <div className="errorMsg">{this.state.lastNameError}</div>
            )}
            <br/>
            <br/>
            <label>Company : </label>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.companyError && (
              <div className="errorMsg">{this.state.companyError}</div>
            )}
            <br/>
            <label>Email Address : </label>
            <input
              type="email"
              placeholder="Email Address"
              name="emailAddress"
              value={this.state.emailAddress}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.emailAddressError && (
              <div className="errorMsg">{this.state.emailAddressError}</div>
            )}
            <br/>
            <div className="passwordDiv" style={{display:"flex"}}>
                <div className="initialPassword">
            <label>Password : </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.passwordError && (
              <div className="errorMsg">{this.state.passwordError}</div>
            )}
            </div>
            <br/>
            <div className="confirmPassword" style={{marginLeft:"20px"}}>
            <label>Confirm Password : </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.passwordConfirmationError && (
              <div className="errorMsg">
                {this.state.passwordConfirmationError}
              </div>
            )}
            </div>
            </div>

            <br/>
            <label>Address : </label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.addressError && (
              <div className="errorMsg">
                {this.state.addressError}
              </div>
            )}
            <br/>
            <div className="regionDiv" style={{display:"flex"}}>
                <div className="city">
            <label> City : </label>
            <input
              type="text"
              placeholder="city"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.cityError && (
              <div className="errorMsg">{this.state.cityError}</div>
            )}
            </div>
            <br/>
            <div className="state" style={{marginLeft:"20px"}}>
            <label>State : </label>
            {/* <input
              type="text"
              placeholder="state"
              name="state"
              value={this.state.states}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            /> */}
            <br />
            {this.state.stateError && (
              <div className="errorMsg">{this.state.stateError}</div>
            )}
            </div>
            </div>
            <br/>
            <button onClick={this.state.print}>Preview</button>
            <button style={{marginLeft:"10px"}}>Add</button>
          </form>
          </div>
        )}
      </div>
    );
  }
}
export default FormComponent;