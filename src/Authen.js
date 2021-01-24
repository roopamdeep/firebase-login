import React, { Component } from "react";
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDYS57S98yrcqo6AadZMnaWToGdeAl0bkk",
  authDomain: "fir-login-5ddc1.firebaseapp.com",
  databaseURL: "https://fir-login-5ddc1-default-rtdb.firebaseio.com",
  projectId: "fir-login-5ddc1",
  storageBucket: "fir-login-5ddc1.appspot.com",
  messagingSenderId: "619791028008",
  appId: "1:619791028008:web:123964348d9f50b0d98a1d",
};

class Authen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    // console.log(email, password);
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch((e) => {
      var err = e.message;
      this.setState({ err });
    });
  }
  signup(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    // console.log(email, password);
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
      .then((user) => {
        var err = "Welcome" + user.email;
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            email: user.email,
          });

        this.setState({ err });
      })
      .catch((e) => {
        var err = e.message;
        this.setState({ err });
      });
  }
  logout() {}
  render() {
    return (
      <div>
        <input
          id="email"
          ref="email"
          type="email"
          placeholder="Enter your Email"
        />{" "}
        <br />
        <input
          id="pass"
          ref="password"
          type="password"
          placeholder="Enter your Password"
        />
        <br />
        <p> {this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}> Sign Up</button>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default Authen;
