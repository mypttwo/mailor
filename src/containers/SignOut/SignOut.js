import React, { Component } from 'react';

class SignOut extends Component{
    signOut_ = () => {
        if(window.gapi && window.gapi.auth2) {
            let auth2 = window.gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                auth2.disconnect();
                console.log('User disconnected.');
                
            });
        }
        this.props.isSignedIn(false, null, null);
    }

    signOut = () => {
        if (this.props.GoogleAuth.isSignedIn.get()) {
            this.props.GoogleAuth.signOut();
            //this.props.GoogleAuth.disconnect();
            this.signOut_();
          } 
    }
   
    render () {
        return (
            <button type="button" className="btn btn-danger" onClick={this.signOut.bind(this)}>
                Sign Out
            </button>
            
        );
    }
}

export default SignOut;