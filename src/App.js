import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './containers/SignIn/SignIn';
import SignOut from './containers/SignOut/SignOut';
import SignInLayout from './components/SignInLayout/SignInLayout';
import { BrowserRouter} from 'react-router-dom';
import Aux from './hoc/Aux';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  state = {
    isSignedIn : false,
    GoogleAuth : null
  }

  isSignedIn = () => {
    return this.state.GoogleAuth && this.state.GoogleAuth.currentUser && this.state.GoogleAuth.currentUser.get() ? true : false;
  }

  signInHandler = (isSignedIn, GoogleAuth, googleUser) => {
    this.setState({
      isSignedIn : isSignedIn,
      GoogleAuth : GoogleAuth,
      googleUser : googleUser
    });
  }
  render() {
    let display = '';
    if(this.state.isSignedIn === false){
      display = (
        <div className="mt-100"> 
      <SignInLayout >
        <SignIn isSignedIn={this.signInHandler} isNewRegistration={this.isNewRegistration} />
      </SignInLayout>
      </div>);
      }
    if(this.state.isSignedIn){
      display = (
        <BrowserRouter>
        <Aux>
          <NavBar googleUser={this.state.googleUser}>
            <SignOut  GoogleAuth={this.state.GoogleAuth} isSignedIn={this.signInHandler}/>
          </NavBar>
        </Aux>
        </BrowserRouter>
      );
    }
    return (
        <Layout>
          {display}       
        </Layout>       
    );
  }
}

export default App;
