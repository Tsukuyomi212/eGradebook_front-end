import React, { Component } from "react";
import { ADMINS } from "../../services/api";
import Header from "../common/Header";
import "../common/ProfileUpdate.css";

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      id: localStorage.getItem("id")
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      this.props.history.push("/");
    } else {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      };
      const profileURL = ADMINS + this.state.id;

      fetch(profileURL, requestOptions)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>
              this.setState({
                userData: data
              })
            );
          } else {
            response.text().then(message => alert("Something went wrong"));
          }
        })
        .catch(error => console.log(error));
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      userData: { ...this.state.userData, [name]: target.value }
    });
  };

  handleSubmit = event => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        firstName: this.state.userData.firstName,
        lastName: this.state.userData.lastName,
        username: this.state.userData.userName,
        email: this.state.userData.email
      })
    };
    console.log("requestOptions:", requestOptions);
    const path = ADMINS + this.state.id;
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({ errorMessage: "" });
            alert("Admin profile updated successfully!");
          });
        } else {
          response
            .text()
            .then(message => this.setState({ errorMessage: message }));
        }
      })
      .catch(error => console.log(error));
    event.preventDefault();
  };

  goBack = () => this.props.history.push("/admin/profile");

  render() {
    return (
      <div className="home_background">
        <Header />
        <p className="page_heading">Update profile data</p>
        <div className="update_profile_data">
          <form onSubmit={this.handleSubmit}>
            <p>
              <span className="update_data_font">First name: </span>
              <input
                className="input_data"
                placeholder={this.state.firstName}
                name="firstName"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <p>
              <span className="update_data_font">Last name: </span>
              <input
                className="input_data"
                placeholder={this.state.lastName}
                name="lastName"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <p>
              <span className="update_data_font">Username: </span>
              <input
                className="input_data"
                placeholder={this.state.username}
                name="userName"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <p>
              <span className="update_data_font"> E-mail: </span>
              <input
                className="input_data"
                placeholder={this.state.email}
                name="email"
                type="text"
                onChange={this.handleInputChange}
              />
            </p>
            <button
              className="button"
              id="button_save_update"
              onClick={event => {
                this.handleSubmit(event);
                this.goBack(event);
              }}
            >
              Save changes
            </button>
            <button
              className="button"
              id="button_cancel_update"
              type="button"
              value="Cancel"
              onClick={this.goBack}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileUpdate;
